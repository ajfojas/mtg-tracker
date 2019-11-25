import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import $ from 'jquery';
import { StateContext } from './contexts/StateContext.jsx';

export default function CardEntry({ cardInfo }) {
  const { displayCollection } = useContext(StateContext);

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

  function handleDeleteCard(event) {
    event.preventDefault();
    axios.delete(`/api/collection/${cardInfo.primaryID}`)
      .then(() => {
        $('#status').text(`Deleted ${cardInfo.name}`);
        setTimeout(() => {
          $('#status').text('');
        }, 3000);
      })
      .catch(error => {
        console.log(error);
      })
  }

  let addDeleteButton = <Add onClick={handleAddCard}>Add to Collection</Add>;
    if (displayCollection) {
      addDeleteButton = <Delete onClick={handleDeleteCard}>Delete from Collection</Delete>;
    }

    let imageURL = cardInfo.imageUrl.replace(/(123abc)/gi, ':').replace(/(234bcd)/gi, '/').replace(/(345cde)/gi, '.').replace(/(456def)/gi, '?').replace(/(567efg)/gi, '=').replace(/(678fgh)/gi, '&');

    return (
      <Div>
        <Image src={imageURL}></Image>
        {addDeleteButton}
      </Div>
    )
}

// Styles
const Div = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 240px;
  padding: 5px;
`;

const Image = styled.img`
  height: 300px;
  border-radius: 4.5%;
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

const Delete = styled.button`
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
