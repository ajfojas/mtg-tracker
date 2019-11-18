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
      viewCollection: false
    };
  }

  searchCard(event) {
    event.preventDefault();
    let searchTerm = $('#card-search').val();
    $('#card-search').val('');
    if (searchTerm.length === 0) {
      return;
    }

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
          return 0;
        });
        console.log(filteredCards)
        this.setState({
          recentlySearched: filteredCards,
          viewCollection: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  viewCollection(event) {
    event.preventDefault();
    console.log('finish post first');
    // axios.get('/api/collection')
    //   .then(cards => {
    //     console.log(cards)
    //     let collection = cards.data.rows;
    //     this.setState({
    //       recentlySearched: collection,
    //       viewCollection: true
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
  }

  deleteCollection(event) {
    event.preventDefault();
    console.log('finish post first');
    // axios.delete('/api/cards')
    //   .then(results => {
    //     alert('Collection deleted');
    //     let collection = results.data.rows;
    //     //maybe format cards here
    //     this.setState({
    //       recentlySearched: collection
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert(error);
    //   })
  }

  render() {
    let display;
    if (this.state.viewCollection) {
      display = <CardList cardList={this.state.collection} button={this.state.viewCollection} />;
    } else {
      display = <CardList cardList={this.state.recentlySearched} button={this.state.viewCollection} />;
    }

    return (
      <div>
        <Search handleSearch={this.searchCard} />
        <Button onClick={this.viewCollection}>View Collection</Button>
        {' '}
        <Button onClick={this.deleteCollection}>Delete Collection</Button>
        {display}
      </div>
    )
  }
}

export default App;

// Styles
const Button = styled.button`
  display: inline-block;
`;