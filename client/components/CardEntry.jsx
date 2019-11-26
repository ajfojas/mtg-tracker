import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import $ from 'jquery';
import { StateContext } from './contexts/StateContext.jsx';

export default function CardEntry({ cardInfo }) {
  const { displayCollection, dispatch } = useContext(StateContext);

  function handleAddCard(event) {
    event.preventDefault();
    let imageURL = cardInfo.imageUrl.replace(/(:)/gi, '123abc').replace(/(\/)/gi, '234bcd').replace(/(\.)/gi, '345cde').replace(/(\?)/gi, '456def').replace(/(=)/gi, '567efg').replace(/(&)/gi, '678fgh');
    let cardName = cardInfo.name.replace(/(')/gi, '123abc');

    axios.post(`/api/collection/${cardInfo.id}/${imageURL}/${cardName}`)
      .then(() => {
        $('#status').text(`Added ${cardInfo.name}`);
        setTimeout(() => {
          $('#status').text('');
        }, 3000);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleRemoveCard(event) {
    event.preventDefault();
    axios.delete(`/api/collection/${cardInfo.primaryID}`)
      .then(() => {
        let cardName = cardInfo.name.replace(/(123abc)/gi, '\'')
        $('#status').text(`Removed ${cardName}`);
        setTimeout(() => {
          $('#status').text('');
        }, 3000);
      })
      .then(() => {
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
      })
      .catch(error => {
        console.log(error);
      })
  }

  let addRemoveButton = <Add onClick={handleAddCard}>Add to Collection</Add>;
    if (displayCollection) {
      addRemoveButton = <Remove onClick={handleRemoveCard}>Remove from Collection</Remove>;
    }

    let imageURL = cardInfo.imageUrl.replace(/(123abc)/gi, ':').replace(/(234bcd)/gi, '/').replace(/(345cde)/gi, '.').replace(/(456def)/gi, '?').replace(/(567efg)/gi, '=').replace(/(678fgh)/gi, '&');

    return (
      <Div>
        <Image src={imageURL}></Image>
        {addRemoveButton}
      </Div>
    );
}

// Styles
const Div = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 240px;
  padding: 10px;
`;

const Image = styled.img`
  height: 300px;
  border-radius: 4.5%;
  padding-bottom: 5px;
`;

const Add = styled.button`
  width: 216px;
  height: 30px;
  border: 1px solid #17a2b8;
  background: #222;
  font-size: 16px;
  color: #17a2b8;
  padding: 5px 0;
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

const Remove = styled.button`
  width: 216px;
  height: 30px;
  border: 1px solid #dc3545;
  background: #222;
  font-size: 16px;
  color: #dc3545;
  padding: 5px 0;
  &:hover {
    border: 1px solid #950412;
    background: #dc3545;
    color: white;
  }
  &:active {
    border: 1px solid #dc3545;
    background: #950412;
    color: white;
  }
`;
