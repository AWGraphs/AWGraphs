import { useState } from 'react'
import './Node.css'

function Node({ selected, setSelected, pos }) {
  function handleClick(e) {
    e.stopPropagation();
    setSelected();
  }

  return (
    <circle
      className={"node" + " " + (selected ? "selected" : "")}
      cx={pos.x} cy={pos.y}
      r="10"
      onClick={handleClick}
      fill={selected ? "red" : "black"}>
    </circle>
  )
}

export default Node
