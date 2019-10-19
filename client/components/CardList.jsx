import React from 'react';
import CardEntry from './CardEntry.jsx';
import styled from 'styled-components';

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.cardList.map(card => {
          if (card.imageUrl) {
            return <CardEntry key={card.id} cardInfo={card} />
          }
        })}
      </div>
    )
  }
}

export default CardList;