export const appReducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_CARD':
      return {
        recentlySearched: action.newState.recentlySearched,
        displayCollection: action.newState.displayCollection,
      };
    case 'VIEW_COLLECTION':
      return {
        collection: action.newState.collection,
        displayCollection: action.newState.displayCollection,
      };
    case 'DELETE_COLLECTION':
      return {
        collection: action.newState.collection,
        recentlySearched: action.newState.recentlySearched,
        displayCollection: action.newState.displayCollection,
      };
    default:
      return state;
  }
};
