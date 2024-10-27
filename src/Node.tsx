import './Node.css'

function Node({ selected, onClick, pos }: { selected: boolean, onClick: (e: React.MouseEvent) => void, pos: { x: number, y: number } }) {
  return (
    <circle
      className={"node" + " " + (selected ? "selected" : "")}
      cx={pos.x} cy={pos.y}
      r="10"
      onClick={onClick}
      fill={selected ? "red" : "black"}>
    </circle>
  )
}

export default Node
