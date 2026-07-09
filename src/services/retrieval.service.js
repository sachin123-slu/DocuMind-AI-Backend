import { index } from "../config/pinecone.js";
import { generateEmbedding } from "./embedding.service.js";

export async function retrieveRelevantChunks(query) {
  const queryEmbedding = await generateEmbedding(query);

  const searchResult = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  return searchResult.matches;
}