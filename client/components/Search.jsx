import React, { useContext } from 'react';
import axios from 'axios';
import $ from 'jquery';
import styled from 'styled-components';
import { StateContext } from './contexts/StateContext.jsx';

export default function Search() {
  const { dispatch } = useContext(StateContext);

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
        let newState = {
          recentlySearched: filteredCards,
          displayCollection: false,
        };
        dispatch({type: 'SEARCH_CARD', newState});
      })
      .catch(error => {
        $('#status').text('');
        console.log(error);
      });
  }

  return (
    <div>
      <Form onSubmit={handleSearchCard}>
        <label htmlFor="card-search">Search Card Name: </label>
        <input type="search" id="card-search" placeholder="Card Name" />
      </Form>
      <Go onClick={handleSearchCard}>Go</Go>
    </div>
  );
};

// Styles
const Form = styled.form`
  display: inline-block;
`;

const Go = styled.button`
  display: inline-block;
  border-color: green;
`;
