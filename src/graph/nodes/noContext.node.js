export async function noContextNode(state) {
  return {
    ...state,
    answer:
      "I couldn't find relevant information in the uploaded documents."
  };
}