import React, { useContext } from 'react';
import CardEntry from './CardEntry.jsx';
import { StateContext } from './contexts/StateContext.jsx';
import $ from 'jquery';
import styled from 'styled-components';

export default function CardList() {
  const { recentlySearched, collection, displayCollection } = useContext(StateContext);

  let searchTerm = (<SearchTerm>{$('#card-search').val()}</SearchTerm>)
  
  let cardList = recentlySearched;
  if (displayCollection) {
    cardList = collection;
  }

  if (cardList.length === 0) {
    let text = 'No results';
    if ($('#card-search').val() && !displayCollection) {
      return <List>No results for "{searchTerm}"</List>
    } else if (displayCollection) {
      text = 'Your collection is empty';
    }
    return (
      <List>{text}</List>
    );
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

  let cardGrammar1 = cardList.length === 1 ? 'card includes' : 'cards include';
  let cardGrammar2 = cardList.length === 1 ? 'its' : 'their';
  let status = <Status>{cardList.length + ' ' + cardGrammar1} "{searchTerm}" in {cardGrammar2} name</Status>;
  if(displayCollection) {
    let cardGrammar = cardList.length === 1 ? 'card' : 'cards';
    status = <Status>{cardList.length + ' ' + cardGrammar} in your collection</Status>;
  }

  return (
    <div>
      {status}
      <List>
        {list.map((card, index) => {
          return <CardEntry key={index} cardInfo={card} />
        })}
      </List>
    </div>
  );
}

// Styles
const Status = styled.div`
  margin-left: 20px;
`;

const SearchTerm = styled.span`
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
