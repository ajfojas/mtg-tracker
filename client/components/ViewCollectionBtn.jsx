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
  border: 1px solid #17a2b8;
  width: 135px;
  height: 30px;
  background: #222;
  font-size: 16px;
  color: #17a2b8;
  padding: 5px 0;
  margin: 5px 5px 5px 20px;
  &:hover {
    border: 1px solid #026877;
    background: #17a2b8;
    color: white;
  }
  &:active {
    border: 1px solid #17a2b8;
    background: #026877;
    color: white;
  }
`;
