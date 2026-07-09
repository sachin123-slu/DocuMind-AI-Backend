import { index } from "../config/pinecone.js";

export async function storeChunks(chunks) {
    await index.upsert(chunks);
}