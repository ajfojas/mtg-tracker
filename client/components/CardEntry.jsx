import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import $ from 'jquery';

export default function CardEntry({ cardInfo, button }) {
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
    if (button) {
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
`;

const Add = styled.button`
  width: 215px;
  border-color: blue;
`;

const Delete = styled.button`
  width: 215px;
  border-color: red;
`;