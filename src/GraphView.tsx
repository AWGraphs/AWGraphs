import { useState } from 'react'
import Node from './Graph/Node.tsx'
import './GraphView.css'
import Edge from './Graph/Edge.tsx';

let nextNodeId = 0;
let nextEdgeId = 0;

interface NodeInfo {
  id: number,
  selected: boolean,
  position: { x: number, y: number }
}

interface EdgeInfo {
  id: number,
  selected: boolean,
  from_id: number,
  to_id: number
}

function GraphView({ className }: { className: string }) {
  const [nodes, setNodes] = useState<NodeInfo[]>([]);
  const [edges, setEdges] = useState<EdgeInfo[]>([]);

  function onClick(e: React.MouseEvent) {
    const enabledNodes = nodes.filter((v) => v.selected);
    const enabledEdges = edges.filter((v) => v.selected);
    if (enabledNodes.length > 0) {
      setNodes((nodes) => nodes.map((v) => { v.selected = false; return v; }))
    }
    if (enabledEdges.length > 0) {
      setEdges((edges) => edges.map((v) => { v.selected = false; return v; }))
    }

    if (!(enabledNodes.length > 0 || enabledEdges.length > 0)) {
      const id = nextNodeId++;
      const new_node = { id: id, selected: false, position: { x: e.clientX, y: e.clientY } };
      setNodes(nodes => [...nodes, new_node]);
    }
  }

  function onClickNode(id: number, event: React.MouseEvent) {
    event.stopPropagation();
    const enabledNodes = nodes.filter((v) => v.selected);
    if (enabledNodes.length == 1) {
      setEdges((edges) => [...edges,
      {
        id: nextEdgeId++,
        selected: false,
        from_id: enabledNodes[0].id,
        to_id: id
      }]);
      setNodes((nodes) => nodes.map((v) => { v.selected = false; return v; }));
    } else {
      setNodes((nodes) => nodes.map((v) => {
        if (v.id == id) {
          v.selected = true;
        } else {
          v.selected = false;
        }
        return v;
      }));
    }
  }

  function onClickEdge(id: number, event: React.MouseEvent) {
    event.stopPropagation();
    setEdges((edges) => edges.map((edge) => {
      if (edge.id == id) {
        edge.selected = true;
      } else {
        edge.selected = false;
      }
      return edge;
    }));
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
      {nodes.map((node) => (
        <Node key={node.id} selected={node.selected} onClick={(e) => onClickNode(node.id, e)} pos={node.position} />
      ))}
      {edges.map((edge) => {
        const from_node = nodes.find((v) => v.id == edge.from_id);
        const to_node = nodes.find((v) => v.id == edge.to_id);
        if (from_node && to_node) {
          return (<Edge key={edge.id} selected={edge.selected} from={from_node.position} to={to_node.position} onClick={(e) => onClickEdge(edge.id, e)} />);
        }
      })}
    </svg>
  )
}

export default GraphView
