import React from "react";
import { connect } from "react-redux";

const Rect = ({
  cellKey,
  currentColor,
  mouseIsDown,
  cell,
  dispatchUpdateCell
}) => {
  const handleMouseEnter = () => {
    if (mouseIsDown) {
      if (cell.color !== currentColor) {
        dispatchUpdateCell({ cellKey, currentColor });
      }
    }
  };
  return (
    <rect
      shape-rendering="crispEdges"
      width="20"
      height="20"
      x={cell.x}
      y={cell.y}
      fill={cell.color}
      stroke={cell.color}
      onMouseEnter={handleMouseEnter}
    ></rect>
  );
};

const mapStateToProps = state => {
  return {
    currentColor: state.currentColor,
    mouseIsDown: state.mouseIsDown
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateCell(payload) {
      dispatch({
        type: "UPDATE_CELL",
        payload
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rect);
