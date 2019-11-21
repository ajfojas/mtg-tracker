import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from './contexts/StateContext.jsx';

export default function DeleteCollectionBtn() {
  const { handleDeleteCollection } = useContext(StateContext);

  return (<Delete onClick={handleDeleteCollection}>Delete Collection</Delete>)
}

// Styles
const Delete = styled.button`
  display: inline-block;
  border-color: red;
`;
