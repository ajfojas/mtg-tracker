import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 240px;
  padding: 5px;
`;

const Image = styled.img`
  height: 300px;
`;

const Button = styled.button`
  width: 215px;
`;

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('card list mounted');
  }

  render() {
    return (
      <div>
        {this.props.cardList.map(card => {
          if (card.imageUrl) {
            return (
              <Div key={card.id}>
                <Image src={card.imageUrl}></Image>
                <Button>Add to Collection</Button>
              </Div>
            )
          }
        })}
      </div>
    )
  }
}

export default CardList;