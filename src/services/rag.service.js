import { ragGraph } from "../graph/rag.graph.js";

export async function askRAG(question) {
  const result = await ragGraph.invoke({
    question,
  });

  return {
    answer: result.answer,
    sources: result.matches.map((match) => ({
      score: match.score,
      fileName: match.metadata.fileName,
      chunkIndex: match.metadata.chunkIndex,
    })),
  };
}