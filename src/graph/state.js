import { Annotation } from "@langchain/langgraph";

export const GraphState = Annotation.Root({
  question: Annotation(),
  matches: Annotation(),
  context: Annotation(),
  answer: Annotation(),
  isRelevant: Annotation(),
});