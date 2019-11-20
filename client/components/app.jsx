import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Search from './Search.jsx';
import CardList from './CardList.jsx';
import styled from 'styled-components';

export default function App() {
  const [recentlySearched, setRecentlySearched] = useState([]);
  const [collection, setCollection] = useState([]);
  const [displayCollection, setDisplayCollection] = useState(false);

  // cDM, componentDidUpdate - meaning component rerendered
  useEffect(() => console.log(recentlySearched), [recentlySearched])

  function handleSearchCard(event) {
    event.preventDefault();
    let searchTerm = $('#card-search').val();
    $('#card-search').val('');
    if (searchTerm.length === 0) {
      return;
    }
    $('#status').text('Loading...');

    axios.get(`/api/cards/${searchTerm}`)
      .then(cards => {
        $('#status').text('');
        let filteredCards = cards.data.filter(card => card.imageUrl);
        setRecentlySearched(filteredCards);
        setDisplayCollection(false);
      })
      .catch(error => {
        $('#status').text('');
        console.log(error);
      });
  }

  function handleViewCollection(event) {
    event.preventDefault();
    axios.get('/api/collection')
      .then(cards => {
        setCollection(cards.data.row);
        setDisplayCollection(true);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleDeleteCollection(event) {
    event.preventDefault();
    axios.delete('/api/collection')
      .then(results => {
        setCollection(results.data.rows);
      })
      .catch(error => {
        console.log(error);
      })
  }

  let cardList = recentlySearched;
  if (displayCollection) {
    cardList = collection;
  }

  return (
    <div>
      <Search handleSearch={handleSearchCard} />
      <View onClick={handleViewCollection}>View Collection</View>
      {' '}
      <Delete onClick={handleDeleteCollection}>Delete Collection</Delete>
      {' '}
      <span id="status"></span>
      <CardList cardList={cardList} collectionList={collection} viewCollection={displayCollection} />                 {/*still have to pass state down*/}
    </div>
  )
}

// Styles
const View = styled.button`
display: inline-block;
border-color: blue;
`;

const Delete = styled.button`
  display: inline-block;
  border-color: red;
`;
