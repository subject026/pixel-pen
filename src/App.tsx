import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";

import { attachKeybindings } from "./keybindings";
import Panel from "./components/Panel";
import Rect from "./components/Rect";

const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }

  main {
    height: 100vh;
  }
`;

const SVG = styled.svg`
  background-color: #fff;
  width: 100%;
  height: 100%;
  stroke-width: 0;
`;

const App = props => {
  const {
    svgX,
    svgY,
    cells,
    zoom,
    dispatchMouseEnter,
    dispatchMouseLeave
  } = props;

  const svgRef = useRef(null);

  useEffect(() => {
    attachKeybindings(svgRef);
  }, []);

  const handleMouseEnter = () => {
    dispatchMouseEnter();
  };

  const handleMouseLeave = () => {
    dispatchMouseLeave();
  };

  return (
    <main>
      <GlobalStyles />
      <Panel />
      <SVG
        ref={svgRef}
        viewBox={`${svgX} ${svgY} ${zoom} ${zoom}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {Object.keys(cells).map(key => {
          return <Rect key={`cell_${key}`} cellKey={key} cell={cells[key]} />;
        })}
      </SVG>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    ctrlIsDown: state.ctrlIsDown,
    mouseIsOverSvg: state.mouseIsOverSvg,
    svgX: state.svgX,
    svgY: state.svgY,
    mouseX: state.mouseX,
    mouseY: state.mouseY,
    cells: { ...state.cells },
    currentColor: state.currentColor,
    zoom: state.zoom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchMouseEnter() {
      dispatch({
        type: "SVG_ENTER"
      });
    },
    dispatchMouseLeave() {
      dispatch({
        type: "SVG_LEAVE"
      });
    }
    // dispatchAddCell(payload: TPayload) {
    //   dispatch({
    //     type: "ADD_CELL",
    //     payload
    //   });
    // },
    // dispatchCellClick(payload: TPayload) {
    //   dispatch({
    //     type: "CLICK_CELL",
    //     payload
    //   });
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
