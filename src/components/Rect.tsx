import React from 'react';
import { connect } from 'react-redux';

interface TRectProps {
  cellKey: string;
  currentColor: string;
  mouseIsDown: boolean;
  cell: TCell;
  dispatchUpdateCell: Function;
}

const Rect: React.FC<TRectProps> = ({ cellKey, currentColor, mouseIsDown, cell, dispatchUpdateCell }) => {
  const handleMouseEnter = (): void => {
    if (mouseIsDown) {
      if (cell.hsl !== currentColor) {
        dispatchUpdateCell({ cellKey, currentColor });
      }
    }
  };
  return (
    <rect
      shapeRendering="crispEdges"
      width="20"
      height="20"
      x={cell.x}
      y={cell.y}
      fill={cell.hsl}
      stroke={cell.hsl}
      onMouseEnter={handleMouseEnter}
    ></rect>
  );
};

const mapStateToProps = (state): object => {
  return {
    currentColor: state.currentColor,
    mouseIsDown: state.mouseIsDown,
  };
};

const mapDispatchToProps = (dispatch): object => {
  return {
    dispatchUpdateCell(payload: TPayload): void {
      dispatch({
        type: 'UPDATE_CELL',
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rect);
