import { useState } from 'react'
import Node from './Node.tsx'
import './GraphView.css'

let id_counter = 0;
function getId() {
  id_counter += 1;
  return id_counter - 1;
}

function GraphView({ className }) {
  const [nodes, setNodes] = useState([]);
  const [idCounter, setIdCounter] = useState();

  function setSelected(id) {
    setNodes((nodes) => {
      const newNodes = nodes.map((node) => {
        console.log(node.key, id, node.key == id);
        return {
          ...node,
          selected: node.key == id,
        };
      });
      return newNodes;
    });
  }

  function getSelected(nodes) {
    nodes.forEach((node) => {
      if (node.selected) {
        return node.key;
      }
    });
    return undefined;
  }

  function handleClick(e) {
    if(getSelected(nodes)) {
      setSelected(undefined);
    } else {
      const id = getId();
      setNodes((nodes) => [
        ...nodes,
        (
          <Node key={id} selected={false} pos={{ x: e.clientX, y:e.clientY }} setSelected={()=>{setSelected(id)}}/>
        ),
      ]);
    }
  }
    
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} onClick={handleClick}>
      {nodes}
    </svg>
  )
}

export default GraphView
