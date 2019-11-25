import React from 'react';
import Search from './Search.jsx';
import CardList from './CardList.jsx';
import ViewCollectionBtn from './ViewCollectionBtn.jsx';
import DeleteCollectionBtn from './DeleteCollectionBtn.jsx';
import StateContextProvider from './contexts/StateContext.jsx';
import styled from 'styled-components';

export default function App() {
  return (
    <div>
      <Header>PACK RAT</Header>
      <StateContextProvider>
        <Search />
        <ViewCollectionBtn />
        {' '}
        <DeleteCollectionBtn />
        {' '}
        <CardList />
      </StateContextProvider>
    </div>
  );
};

// Styles
const Header = styled.div`
  font-size: 36px;
  font-weight: bold;
  background: #222;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
`;
