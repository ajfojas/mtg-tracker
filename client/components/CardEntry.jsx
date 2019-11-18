import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class CardEntry extends React.Component {
  constructor(props) {
    super(props);

    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.state = {};
  }

  addCard(event) {
  }

  deleteCard() {
  }

  render() {
    let button;
    if (this.props.button) {
      button = <Button onClick={this.deleteCard}>Delete from Collection</Button>;
    } else {
      button = <Button onClick={this.addCard}>Add to Collection</Button>;
    }

    return (
      <Div>
        <Image src={this.props.cardInfo.imageUrl}></Image>
        {button}
      </Div>
    )
  }
}

export default CardEntry;

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

const Button = styled.button`
  width: 215px;
`;