import { ragPrompt } from "../../prompts/rag.prompt.js";
import {askGroq} from "../../services/groq.service.js"

export async function generateNode(state) {
  const prompt = await ragPrompt.format({
    context: state.context,
    question: state.question,
  });

  const answer = await askGroq(prompt);

  return {
    ...state,
    answer,
  };
}