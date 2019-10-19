import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

class CardEntry extends React.Component {
  constructor(props) {
    super(props);

    this.addCard = this.addCard.bind(this);

    this.state = {
      card: this.props.cardInfo
    }
  }

  addCard(event) {
    event.preventDefault();
    axios.post(`/api/cards/${this.state.card.name}/${this.state.card.id}`)
      .then((data) => {
        console.log(data);
        console.log(this.state.card.name, 'posted to database');
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
  }

  render() {
    console.log(this.state.card)
    return (
      <Div>
        <Image src={this.state.card.imageUrl}></Image>
        <Button onClick={this.addCard}>Add to Collection</Button>
      </Div>
    )
  }
}

export default CardEntry;