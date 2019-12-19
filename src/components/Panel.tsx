import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import styledComponentsTS from 'styled-components-ts';

const Nav = styled.nav`
  padding: 40px;
  background-color: #202020;
`;

const Pallet = styled.section`
  display: grid;
  grid-template-columns: auto auto auto;
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

const Sliders = styled.section`
  input {
    width: 200px;
  }
`;

const ColorButton = styledComponentsTS<TStyledProps>(styled.button)`
  ${({ color, selected }): any => css`
    outline: none;
    background-color: ${color};
    height: 30px;
    width: 30px;
    border: ${selected ? '3px solid blue' : '3px solid #ccc'};
  `}
`;

interface TPanelProps {
  colors: Array<string>;
  currentColor: string;
  dispatchAddColor: Function;
  dispatchRemoveColor: Function;
  dispatchChangeColor: Function;
  dispatchUpdateColor: Function;
  dispatchSetBackgroundColor: Function;
}

const Panel: React.FC<TPanelProps> = ({
  colors,
  currentColor,
  dispatchAddColor,
  dispatchRemoveColor,
  dispatchChangeColor,
  dispatchUpdateColor,
  dispatchSetBackgroundColor,
}) => {
  const handleAddColor = (): void => {
    dispatchAddColor();
  };

  const handleChangeColor = (key): void => {
    dispatchChangeColor({ key });
  };

  const handleHueChange = ({ target: { value } }): void => {
    dispatchUpdateColor({ value });
  };

  const handleRemoveColor = (): void => {
    dispatchRemoveColor();
  };

  const handleSetBackgroundColor = (): void => {
    dispatchSetBackgroundColor();
  };

  return (
    <Nav>
      <Pallet>
        <ul>
          {Object.keys(colors).map(key => {
            return (
              <ColorButton
                key={`color_${colors[key]}`}
                color={`hsl(${colors[key].hue}, 100%, 50%)`}
                onClick={(): void => handleChangeColor(key)}
                selected={key === currentColor ? true : false}
              />
            );
          })}
        </ul>
        <CurrentColor
          currentColor={currentColor ? `hsl(${colors[currentColor].hue}, 100%, 50%)` : `hsl(0, 100%, 100%)`}
        />
        <Sliders>
          <label htmlFor="hue">
            hue
            <input
              type="range"
              min="0"
              max="359"
              onChange={handleHueChange}
              value={currentColor ? colors[currentColor].hue : 0}
            />
          </label>
          <input type="range" min="0" max="359" />
        </Sliders>
      </Pallet>
      <button onClick={handleAddColor}>Add Color</button>
      <button onClick={handleRemoveColor}>Remove Color</button>
      <button onClick={handleSetBackgroundColor}>Set Background Color</button>
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
    dispatchRemoveColor(): void {
      dispatch({
        type: 'REMOVE_COLOR',
      });
    },
    dispatchChangeColor(payload): void {
      dispatch({
        type: 'CHANGE_COLOR',
        payload,
      });
    },
    dispatchUpdateColor(payload): void {
      dispatch({
        type: 'UPDATE_COLOR',
        payload,
      });
    },
    dispatchSetBackgroundColor(): void {
      dispatch({
        type: 'SET_BACKGROUND_COLOR',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
