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
  const handleAddColor = (): void => {
    dispatchAddColor();
  };

  const handleChangeColor = (key): void => {
    dispatchChangeColor({ key });
  };
  return (
    <Nav>
      <Pallet>
        <ul>
          {Object.keys(colors).map(key => (
            <ColorButton
              key={`color_${colors[key]}`}
              color={`hsl(${colors[key].hue}, 100%, 50%)`}
              onClick={(): void => handleChangeColor(key)}
            />
          ))}
        </ul>
        {/* {currentColor && <CurrentColor currentColor={`hsl(${colors[currentColor].hue}, 100%, 50%)`} />} */}
      </Pallet>
      <button onClick={handleAddColor}>Add Color</button>
    </Nav>
  );
};

const mapStateToProps = (state): object => {
  return {
    currentColor: state.currentColor,
    colors: { ...state.colors },
  };
};

const mapDispatchToProps = (dispatch): object => {
  return {
    dispatchAddColor(): void {
      dispatch({
        type: 'ADD_COLOR',
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
