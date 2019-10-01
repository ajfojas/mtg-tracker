import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: inline-block;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('search mounted')
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleSearch}>
          <label htmlFor="card-search">Search Card Name:</label>
          <input type="search" id="card-search" placeholder="Card Name" />
        </Form>
        <button onClick={this.props.handleSearch}>Go</button>
      </div>
    )
  }
}

export default Search;