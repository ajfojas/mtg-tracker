import React from 'react';
import CardEntry from './CardEntry.jsx';
import styled from 'styled-components';

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.cardList.length === 0) {
      let text = 'No Results';
      if (this.props.cardList === this.props.state.collection) {
        text = 'Collection is Empty'
      }
      return (
        <div>{text}</div>
      )
    }

    let cardList = this.props.cardList.sort((a, b) => {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    console.log(cardList, this.props.state.viewCollection)

    return (
      <div>
        {cardList.map(card => {
          return <CardEntry key={card.id} cardInfo={card} button={this.props.state.viewCollection} />
        })}
      </div>
    )
  }
}

export default CardList;