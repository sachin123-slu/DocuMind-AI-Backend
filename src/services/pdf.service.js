import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";


export async function extractTextFromPDF(filePath) {
  try {
    //converting file into buffer
    const buffer = fs.readFileSync(filePath);

    const data = await pdf(buffer);

    return data.text;
  } catch (error) {
    throw new Error(error.message);
  }
}