import React, { useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { StateContext } from './contexts/StateContext.jsx';

export default function DeleteCollectionBtn() {
  const { dispatch, recentlySearched, collection, displayCollection } = useContext(StateContext);

  function handleDeleteCollection(event) {
    event.preventDefault();
    axios.delete('/api/collection')
      .then(results => {
        let newState = {
          collection: results.data.rows,
          recentlySearched,
          displayCollection,
        };
        dispatch({type: 'DELETE_COLLECTION', newState});
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <Delete onClick={handleDeleteCollection}>Delete Collection</Delete>
  );
}

// Styles
const Delete = styled.button`
  display: inline-block;
  border-color: red;
`;
