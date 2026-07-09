import { extractTextFromPDF } from "./pdf.service.js";
import { splitIntoChunks } from "./chunk.service.js";
import { generateEmbedding } from "./embedding.service.js";
import { storeChunks } from "./vector.service.js";

export async function processDocument(file, fileMetadata) {
  //  Extract text
  const text = await extractTextFromPDF(file);

  //  Split into chunks
  const chunks = await splitIntoChunks(text);

  //  Generate embeddings for each chunk
  const vectors = [];
  for (let i = 0; i < chunks.length; i++) {
    const embedding = await generateEmbedding(chunks[i].pageContent);

    vectors.push({
      id: `${fileMetadata.filename}-chunk-${i}`,
      values: embedding,
      metadata: {
        text: chunks[i].pageContent,
        fileName: fileMetadata.originalname,
        storedFileName: fileMetadata.filename,
        chunkIndex: i,
        totalChunks: chunks.length,
        uploadedAt: new Date().toISOString()
      }
    });
  }

  // Store in Pinecone
  await storeChunks(vectors);

  // Return summary
  return {
    totalCharacters: text.length,
    totalChunks: chunks.length,
    vectorsStored: vectors.length,
  };
}
