import React, { useContext } from 'react';
import axios from 'axios';
import $ from 'jquery';
import styled, { keyframes } from "styled-components";
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
    $('#loader').css('opacity', '1');

    axios.get(`/api/cards/${searchTerm}`)
      .then(cards => {
        $('#loader').css('opacity', '0');
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
        <i className="fas fa-search fa-lg"></i>
        <Input type="search" id="card-search" placeholder="Search for cards..." />
      </Form>
      <Go onClick={handleSearchCard}>Go</Go>
      {' '}
      <Loader id="loader">
        <Span></Span>
        <Span></Span>
        <Span></Span>
        <Span></Span>
        <Span></Span>
      </Loader>
    </div>
  );
};

// Styles
const Form = styled.form`
  display: inline-block;
  margin-left: 20px;
  padding: 5px 0 2px 5px;
  border: 1px solid #999;
`;

const Input = styled.input`
  padding: 5px;
  margin-left: 5px;
  border-style: none;
  background: none;
  font-size: 16px;
  color: white;
  &:focus {
    outline: none;
  }
  &::-webkit-search-cancel-button{
    -webkit-appearance: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 100px #333 inset !important;
    -webkit-text-fill-color: #c1a3eb;
  }
`;

const Go = styled.button`
  display: inline-block;
  border: 1px solid #218838;
  border-radius: 25%;
  width: 40px;
  height: 36px;
  background: #222;
  font-size: 16px;
  color: #218838;
  margin: 5px;
  &:hover {
    border: 1px solid #004e11;
    background: #218838;
    color: white;
  }
  &:active {
    border: 1px solid #218838;
    background: #004e11;
    color: white;
  }
`;

const Loader = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  & ${Loader}:nth-child(2) {
    background-color: blue;
    animation-delay: 0.1s;
  }
  & ${Loader}:nth-child(3) {
    background-color: black;
    animation-delay: 0.2s;
  }
  & ${Loader}:nth-child(4) {
    background-color: red;
    animation-delay: 0.3s;
  }
  & ${Loader}:nth-child(5) {
    background-color: green;
    animation-delay: 0.4s;
  }
  opacity: 0;
`;

// animations must be anywhere above where they are called
const bounce = keyframes`
  from {
    width: 10px;
    height: 10px;
    transform: translate3d(0, 10px, 0);
  }
  to {
    width: 10px;
    height: 10px;
    transform: translate3d(0, -10px, 0);
  }
`;

const Span = styled.span`
  display: inline-block;
  background-color: yellow;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 2px;
  transform: translate3d(0);
  animation: ${bounce} 0.35s infinite alternate;
`;
