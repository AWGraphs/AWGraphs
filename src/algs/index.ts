export * as hierholzer from './hierholzer';

import * as GraphView from '../GraphView';

export interface Node {
  id: number;
}

export interface Edge {
  id: number;
  from_id: number;
  to_id: number;
}

export class Graph {
  nodes: Node[];
  edges: Edge[];

  constructor(nodes: GraphView.NodeInfo[], edges: GraphView.EdgeInfo[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  degree(node: Node): number {
    let res = 0;
    this.edges.forEach((edge: Edge) => {
      if (edge.from_id == node.id) res++;
      if (edge.to_id == node.id) res++;
    })
    return res;
  }

  adjacentNodes(node: Node): Node[] {
    const ids: number[] = [];
    this.edges.forEach((edge: Edge) => {
      if (edge.from_id == node.id) ids.push(edge.to_id);
      if (edge.to_id == node.id) ids.push(edge.from_id);
    })

    const res: Node[] = [];
    ids.forEach((id: number, pos: number) => {
      if (ids.indexOf(id) == pos) {
        const node = this.nodes.find((n) => n.id == id);
        if (node) {
          res.push(node);
        } else {
          console.error("Could not find node with id: ", id);
        }
      }
    });

    return res;
  }

  dfsInner(node: Node, func: (node: Node, path: Node[]) => void, visited: Node[], path: Node[]) {
    if (visited.includes(node)) return;
    visited.push(node);

    this.adjacentNodes(node).forEach((adj: Node) => {
      this.dfsInner(adj, func, visited, [...path, node]);
    });

    func(node, [...path, node]);
  }

  dfs(start: Node, func: () => void) {
    this.dfsInner(start, func, [], []);
  }
}
