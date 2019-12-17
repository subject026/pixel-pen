import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

const Nav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  padding: 40px;
  background-color: midnightblue;
`;

const Pallet = styled.section`
  display: grid;
  grid-auto-columns: 2fr 1fr;
  ul {
    grid-column-start: 1;
    grid-column-end: 2;
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const CurrentColor = styledComponentsTS<TProps>(styled.div)`
  grid-column-start: 2;
  grid-column-end: 3;
  width: 60px;
  height: 60px;
  background-color: ${({ currentColor }) => currentColor};
`;

const ColorButton = styled.button`
  background-color: ${({ color }) => color};
  height: 30px;
  width: 30px;
`;

const Panel = ({
  colors,
  currentColor,
  dispatchAddColor,
  dispatchChangeColor
}) => {
  const [state, setState] = useState({ color: "" });

  const handleAddColor = event => {
    event.preventDefault();
    dispatchAddColor(state.color);
  };

  const handleInputChange = ({ target }) => {
    setState(state => {
      return {
        ...state,
        color: target.value
      };
    });
  };

  const handleChangeColor = color => {
    dispatchChangeColor(color);
  };

  return (
    <Nav>
      <Pallet>
        <ul>
          {colors.map(color => (
            <ColorButton
              color={color}
              onClick={() => handleChangeColor(color)}
            />
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

const mapStateToProps = state => {
  return {
    currentColor: state.currentColor,
    colors: [...state.colors]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchAddColor(payload) {
      dispatch({
        type: "ADD_COLOR",
        payload
      });
    },
    dispatchChangeColor(payload) {
      dispatch({
        type: "CHANGE_COLOR",
        payload
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
