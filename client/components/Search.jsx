import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from './contexts/StateContext.jsx';

export default function Search() {
  const { handleSearchCard } = useContext(StateContext);

  return (
    <div>
      <Form onSubmit={handleSearchCard}>
        <label htmlFor="card-search">Search Card Name: </label>
        <input type="search" id="card-search" placeholder="Card Name" />
      </Form>
      <Go onClick={handleSearchCard}>Go</Go>
    </div>
  )
}

// Styles
const Form = styled.form`
  display: inline-block;
`;

const Go = styled.button`
  display: inline-block;
  border-color: green;
`;
