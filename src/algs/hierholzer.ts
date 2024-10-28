import * as algs from './';

export const name = "Eulerian graph";

export function run(graph: algs.Graph) {
  {
    let valid = true;
    graph.nodes.forEach((node) => {
      if (graph.degree(node) % 2 != 0) {
        console.error("Some nodes have odd degree");
        valid = false;
      }
    });
    if(!valid) return undefined;
  }

  {
    let connected_count = 0;
    graph.dfs(graph.nodes[0], () => {connected_count++});
    if (connected_count != graph.nodes.length) {
      console.error("Graph is not connected");
      return undefined;
    }
  }

  // TODO: Actually find an eulerian path
}
