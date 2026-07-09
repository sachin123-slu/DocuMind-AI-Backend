import { StateGraph, START, END } from "@langchain/langgraph";
import { GraphState } from "./state.js";
import { retrieveNode } from "./nodes/retrieve.node.js";
import { generateNode } from "./nodes/generate.node.js";
import { checkRelevanceNode } from "./nodes/checkRelevance.node.js";
import { noContextNode } from "./nodes/noContext.node.js";

const graphBuilder = new StateGraph(GraphState);

graphBuilder.addNode("retrieve", retrieveNode);
graphBuilder.addNode("checkRelevance", checkRelevanceNode);
graphBuilder.addNode("generate", generateNode);
graphBuilder.addNode("noContext", noContextNode);

graphBuilder.addEdge(START, "retrieve");
graphBuilder.addEdge("retrieve", "checkRelevance");

graphBuilder.addConditionalEdges(
  "checkRelevance",
  (state) => {
    return state.isRelevant ? "generate" : "noContext";
  }
);

graphBuilder.addEdge("generate", END);
graphBuilder.addEdge("noContext", END);

export const ragGraph = graphBuilder.compile();