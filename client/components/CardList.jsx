import React from 'react';
import CardEntry from './CardEntry.jsx';
import styled from 'styled-components';

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.cardList.length === 0) {
      return (
        <div>Collection is empty</div>
      )
    }

    return (
      <div>
        {this.props.cardList.map(card => {
          return <CardEntry key={card.id} cardInfo={card} button={this.props.button} />
        })}
      </div>
    )
  }
}

export default CardList;