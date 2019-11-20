import React from 'react';
import styled from 'styled-components';

export default function Search({ handleSearch }) {
  return (
    <div>
      <Form onSubmit={handleSearch}>
        <label htmlFor="card-search">Search Card Name: </label>
        <input type="search" id="card-search" placeholder="Card Name" />
      </Form>
      <Go onClick={handleSearch}>Go</Go>
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
