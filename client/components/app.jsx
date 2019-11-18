import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Search from './Search.jsx';
import CardList from './CardList.jsx';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.searchCard = this.searchCard.bind(this);
    this.viewCollection = this.viewCollection.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);

    this.state = {
      recentlySearched: [],
      collection: [],
      viewCollection: true
    };
  }

  searchCard(event) {
    event.preventDefault();
    let searchTerm = $('#card-search').val();
    $('#card-search').val('');
    if (searchTerm.length === 0) {
      return;
    }
    $('#loading').text(' Loading...');

    axios.get(`/api/cards/${searchTerm}`)
      .then(cards => {
        $('#loading').text('');
        let filteredCards = cards.data.filter(card => card.imageUrl);
        this.setState({
          recentlySearched: filteredCards,
          viewCollection: false
        });
      })
      .catch(error => {
        $('#loading').text('');
        console.log(error);
      });
  }

  viewCollection(event) {
    event.preventDefault();
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
  }

  deleteCollection(event) {
    event.preventDefault();
    axios.delete('/api/collection')
      .then(results => {
        this.setState({
          collection: results.data.rows
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    let cardList = this.state.recentlySearched;
    if (this.state.viewCollection) {
      cardList = this.state.collection;
    }

    return (
      <div>
        <Search handleSearch={this.searchCard} />
        <Button onClick={this.viewCollection}>View Collection</Button>
        {' '}
        <Button onClick={this.deleteCollection}>Delete Collection</Button>
        <CardList cardList={cardList} state={this.state} />
      </div>
    )
  }
}

export default App;

// Styles
const Button = styled.button`
  display: inline-block;
`;