import React from 'react';
import CardEntry from './CardEntry.jsx';

export default function CardList({ cardList, collectionList, viewCollection }) {
  if (cardList.length === 0) {
    let text = 'No Results';
    if (cardList === collectionList) {
      text = 'Collection is Empty'
    }
    return (
      <div>{text}</div>
    )
  }

  let list = cardList.sort((a, b) => {
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

  return (
    <div>
      {list.map((card, index) => {
        return <CardEntry key={index} cardInfo={card} button={viewCollection} />
      })}
    </div>
  )
}
