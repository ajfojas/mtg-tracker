import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    console.log('mounted')
  }

  render() {
    return (
      <div>
        Hello, App.jsx
      </div>
    )
  }
}

export default App;