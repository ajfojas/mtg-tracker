import React from 'react';
import Search from './Search.jsx';
import CardList from './CardList.jsx';
import ViewCollectionBtn from './ViewCollectionBtn.jsx';
import DeleteCollectionBtn from './DeleteCollectionBtn.jsx';
import StateContextProvider from './contexts/StateContext.jsx';

export default function App() {
  return (
    <div>
      <StateContextProvider>
        <Search />
        <ViewCollectionBtn />
        {' '}
        <DeleteCollectionBtn />
        {' '}
        <span id="status"></span>
        <CardList />
      </StateContextProvider>
    </div>
  );
};
