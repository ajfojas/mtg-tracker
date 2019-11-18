import React from 'react';
import styled from 'styled-components';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleSearch}>
          <label htmlFor="card-search">Search Card Name: </label>
          <input type="search" id="card-search" placeholder="Card Name" />
        </Form>
        <Go onClick={this.props.handleSearch}>Go</Go>
        <span id="loading"></span>
      </div>
    )
  }
}

export default Search;

// Styles
const Form = styled.form`
  display: inline-block;
`;

const Go = styled.button`
  display: inline-block;
  border-color: green;
`;