import React, { useContext } from 'react';
import CardEntry from './CardEntry.jsx';
import { StateContext } from './contexts/StateContext.jsx';
import $ from 'jquery';
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

  let searchTerm = (<SearchTerm>{$('#card-search').val()}</SearchTerm>)
  let cardGrammar1 = cardList.length === 1 ? 'card includes' : 'cards include';
  let cardGrammar2 = cardList.length === 1 ? 'its' : 'their';

  return (
    <div>
      <Status>{cardList.length + ' ' + cardGrammar1} "{searchTerm}" in {cardGrammar2} name</Status>
      <List>
        {list.map((card, index) => {
          return <CardEntry key={index} cardInfo={card} />
        })}
      </List>
    </div>
  )
}

// Styles
const Status = styled.div`
  margin-left: 20px;
`;

let SearchTerm = styled.span`
  color: #c1a3eb;
  font-weight: bold;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
