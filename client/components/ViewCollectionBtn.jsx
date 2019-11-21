import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from './contexts/StateContext.jsx';

export default function ViewCollectionBtn() {
  const { handleViewCollection } = useContext(StateContext);

  return (<View onClick={handleViewCollection}>View Collection</View>)
}

// Styles
const View = styled.button`
  display: inline-block;
  border-color: blue;
`;
