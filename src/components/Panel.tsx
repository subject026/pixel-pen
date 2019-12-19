import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import styledComponentsTS from 'styled-components-ts';

const Nav = styled.nav`
  padding: 40px;
  background-color: #202020;
`;

const Pallet = styled.section`
  display: grid;
  grid-auto-columns: 2fr 1fr;
  ul {
    width: 500px;
    grid-column-start: 1;
    grid-column-end: 2;
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
`;

const CurrentColor = styledComponentsTS<TStyledProps>(styled.div)`
  grid-column-start: 2;
  grid-column-end: 3;
  width: 60px;
  height: 60px;
  background-color: ${({ currentColor }): string => currentColor};
`;

const ColorButton = styled.button`
  background-color: ${({ color }): string => color};
  height: 30px;
  width: 30px;
`;

interface TPanelProps {
  colors: Array<string>;
  currentColor: string;
  dispatchAddColor: Function;
  dispatchChangeColor: Function;
}

const Panel: React.FC<TPanelProps> = ({ colors, currentColor, dispatchAddColor, dispatchChangeColor }) => {
  const [state, setState] = useState({ color: '' });

  const handleAddColor = (event): void => {
    event.preventDefault();
    dispatchAddColor({ color: state.color });
  };

  const handleInputChange = ({ target }): void => {
    setState(state => {
      return {
        ...state,
        color: target.value,
      };
    });
  };

  const handleChangeColor = (color): void => {
    dispatchChangeColor({ color });
  };

  return (
    <Nav>
      <Pallet>
        <ul>
          {colors.map(color => (
            <ColorButton key={`color_${color}`} color={color} onClick={(): void => handleChangeColor(color)} />
          ))}
        </ul>
        <CurrentColor currentColor={currentColor} />
      </Pallet>
      <form onSubmit={handleAddColor}>
        #<input type="text" onChange={handleInputChange} />
      </form>
    </Nav>
  );
};

const mapStateToProps = (state): object => {
  return {
    currentColor: state.currentColor,
    colors: [...state.colors],
  };
};

const mapDispatchToProps = (dispatch): object => {
  return {
    dispatchAddColor(payload): void {
      dispatch({
        type: 'ADD_COLOR',
        payload,
      });
    },
    dispatchChangeColor(payload): void {
      dispatch({
        type: 'CHANGE_COLOR',
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
