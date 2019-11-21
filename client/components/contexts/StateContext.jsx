import React, { createContext, useState } from  'react';
import axios from 'axios';
import $ from 'jquery';

export const StateContext = createContext();

export default function StateContextProvider(props) {
  const [recentlySearched, setRecentlySearched] = useState([]);
  const [collection, setCollection] = useState([]);
  const [displayCollection, setDisplayCollection] = useState(false);

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
        setCollection(cards.data.rows);
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

  return (
    <StateContext.Provider value={{recentlySearched, collection, displayCollection, handleSearchCard, handleViewCollection, handleDeleteCollection}}>
      {props.children}
    </StateContext.Provider>
  )
}
