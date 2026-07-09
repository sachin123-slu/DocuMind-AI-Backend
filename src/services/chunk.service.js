import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

export async function splitIntoChunks(text) {
  const chunks = await splitter.createDocuments([text]);

  return chunks;
}