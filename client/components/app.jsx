import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Search from './Search.jsx';
import CardList from './CardList.jsx';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.cardSearch = this.cardSearch.bind(this);
    this.viewCollection = this.viewCollection.bind(this);

    this.state = {
      cards: []
    };
  }

  cardSearch(event) {
    event.preventDefault();
    let searchTerm = $('#card-search').val();
    console.log(searchTerm, 'searched!');

    axios.get(`/api/cards/${searchTerm}`)
      .then(cards => {
        let filteredCards = cards.data.filter(card => card.imageUrl);
        filteredCards.sort((a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        console.log(filteredCards);
        this.setState({
          cards: filteredCards
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  viewCollection() {
    axios.get(`/api/cards`)
      .then(cards => {
        let filteredCards = cards.data.filter(card => card.imageUrl);
        filteredCards.sort((a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        console.log(filteredCards);
        this.setState({
          cards: filteredCards
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log('app mounted')
  }

  render() {
    return (
      <div>
        <Search handleSearch={this.cardSearch} />
        <Button onClick={this.viewCollection}>View Collection</Button>
        <CardList cardList={this.state.cards} />
      </div>
    )
  }
}

export default App;