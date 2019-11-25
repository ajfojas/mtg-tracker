import React, { useContext } from 'react';
import CardEntry from './CardEntry.jsx';
import { StateContext } from './contexts/StateContext.jsx';
import styled from 'styled-components';

export default function CardList() {
  const { recentlySearched, collection, displayCollection } = useContext(StateContext);
  
  let cardList = recentlySearched;
  if (displayCollection) {
    cardList = collection;
  }

  if (cardList.length === 0) {
    let text = 'No Results';
    if (displayCollection) {
      text = 'Collection is Empty'
    }
    return (
      <List>{text}</List>
    )
  }

  let list = cardList.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <List>
      {list.map((card, index) => {
        return <CardEntry key={index} cardInfo={card} />
      })}
    </List>
  )
}

// Styles
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
