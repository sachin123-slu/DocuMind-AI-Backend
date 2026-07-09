export async function checkRelevanceNode(state) {
  const bestScore = state.matches[0]?.score ?? 0;

  return {
    ...state,
    isRelevant: bestScore > 0.35
  };
}