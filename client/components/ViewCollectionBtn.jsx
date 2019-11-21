import React, { useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { StateContext } from './contexts/StateContext.jsx';

export default function ViewCollectionBtn() {
  const { dispatch } = useContext(StateContext);

  function handleViewCollection(event) {
    event.preventDefault();
    axios.get('/api/collection')
      .then(cards => {
        let newState = {
          collection: cards.data.rows,
          displayCollection: true,
        };
        dispatch({type: 'VIEW_COLLECTION', newState});
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <View onClick={handleViewCollection}>View Collection</View>
  );
}

// Styles
const View = styled.button`
  display: inline-block;
  border-color: blue;
`;
