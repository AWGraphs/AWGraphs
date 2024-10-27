import { useState } from 'react'
import Node from './Node.tsx'
import './GraphView.css'

let nextId = 0;

interface NodeInfo {
  id: number,
  selected: boolean,
  position: { x: number, y: number }
}

function GraphView({ className }: { className: string }) {
  const [nodes, setNodes] = useState<NodeInfo[]>([]);

  function onClick(e: React.MouseEvent) {
    const enabledNodes = nodes.filter((v) => v.selected);
    if (enabledNodes.length > 0) {
      setNodes((nodes) => nodes.map((v) => { v.selected = false; return v; }))
    } else {
      const id = nextId++;
      const new_node = { id: id, selected: false, position: { x: e.clientX, y: e.clientY } };
      setNodes(nodes => [...nodes, new_node]);
    }
  }

  function onClickNode(id: number, event: React.MouseEvent) {
    event.stopPropagation();
    setNodes((nodes) => nodes.map((v) => {
      if (v.id == id) {
        v.selected = true;
      } else {
        v.selected = false;
      }
      return v;
    }));
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
      {nodes.map((node) => (
        <Node key={node.id} selected={node.selected} onClick={(e) => onClickNode(node.id, e)} pos={node.position} />
      ))}
    </svg>
  )
}

export default GraphView
