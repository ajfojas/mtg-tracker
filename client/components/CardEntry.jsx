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
    event.preventDefault();
    let imageURL = this.props.cardInfo.imageUrl.replace(/(:)/gi, '123abc').replace(/(\/)/gi, '234bcd').replace(/(\.)/gi, '345cde').replace(/(\?)/gi, '456def').replace(/(=)/gi, '567efg').replace(/(&)/gi, '678fgh');

    axios.post(`/api/collection/${this.props.cardInfo.id}/${imageURL}/${this.props.cardInfo.name}`)
      .then(results => {
        console.log(this.props.cardInfo.name + ' added');
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteCard(event) {
    event.preventDefault();
    let cardName = this.props.cardInfo.name;
    axios.delete(`/api/collection/${this.props.cardInfo.primaryID}`)
      .then(results => {
        console.log(cardName + ' deleted');
        axios.get('/api/collection')
          .then(cards => {
            this.setState({
              collection: cards.data.rows,
              viewCollection: true
            });
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    let button = <Add onClick={this.addCard}>Add to Collection</Add>;
    if (this.props.button) {
      button = <Delete onClick={this.deleteCard}>Delete from Collection</Delete>;
    }

    let imageURL = this.props.cardInfo.imageUrl.replace(/(123abc)/gi, ':').replace(/(234bcd)/gi, '/').replace(/(345cde)/gi, '.').replace(/(456def)/gi, '?').replace(/(567efg)/gi, '=').replace(/(678fgh)/gi, '&');

    return (
      <Div>
        <Image src={imageURL}></Image>
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

const Add = styled.button`
  width: 215px;
  border-color: blue;
`;

const Delete = styled.button`
  width: 215px;
  border-color: red;
`;