function Edge({ selected, from, to, onClick }: { selected: boolean, from: { x: number, y: number }, to: { x: number, y: number }, onClick: (e: React.MouseEvent) => void }) {
  return (
    <line
      x1={from.x} y1={from.y}
      x2={to.x} y2={to.y}
      stroke={selected ? "red" : "black"}
      strokeWidth="4"
      onClick={onClick}
    />
  );
}

export default Edge;
