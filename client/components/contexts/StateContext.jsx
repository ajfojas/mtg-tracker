import React, { createContext, useReducer } from  'react';
import { appReducer } from '../reducers/appReducer.js';

export const StateContext = createContext();

export default function StateContextProvider(props) {
  const initialState = {
    recentlySearched: [],
    collection: [],
    displayCollection: false
  };

  const [ state, dispatch ] = useReducer(appReducer, initialState);
  const { recentlySearched, collection, displayCollection } = state;

  return (
    <StateContext.Provider value={{recentlySearched, collection, displayCollection, dispatch}}>
      {props.children}
    </StateContext.Provider>
  );
};
