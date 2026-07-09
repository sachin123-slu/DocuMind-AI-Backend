import {retrieveRelevantChunks} from '../../services/retrieval.service.js'

export async function retrieveNode(state) {
  const matches = await retrieveRelevantChunks(state.question);

  const context = matches
    .map((match) => match.metadata.text)
    .join("\n\n");

  return {
    ...state,
    matches,
    context,
  };
}