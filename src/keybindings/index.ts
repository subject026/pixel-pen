import throttle from "lodash.throttle";

import { store } from "../store";
import { publish } from "./publish";

const roundDown = (num): number => {
  if (num % 20 !== 0) {
    return roundDown(num - 1);
  } else {
    return num;
  }
};

export const attachKeybindings = (svgRef): void => {
  const updateCells = (): void => {
    const { mouseX, mouseY, cells, currentColor } = store.getState();
    if (mouseX === null) return;
    const pt = svgRef.current.createSVGPoint();
    pt.x = mouseX;
    pt.y = mouseY;
    const cursorPt = pt.matrixTransform(
      svgRef.current.getScreenCTM().inverse()
    );
    const x = roundDown(Math.floor(cursorPt.x));
    const y = roundDown(Math.floor(cursorPt.y));
    const cellKey = `x${x}y${y}`;
    // if cell pass click down
    if (cells[cellKey]) {
      store.dispatch({
        type: "UPDATE_CELL",
        payload: {
          cellKey,
          currentColor
        }
      });
    } else {
      store.dispatch({
        type: "ADD_CELL",
        payload: {
          cellKey,
          x,
          y,
          color: currentColor
        }
      });
    }
  };

  window.onkeydown = event => {
    const { ctrlIsDown, zoom } = store.getState();
    if (event.keyCode === 17) {
      store.dispatch({ type: "CTRL_DOWN" });
    }
    if (ctrlIsDown) {
      if (event.keyCode === 187) {
        event.preventDefault();
        store.dispatch({
          type: "ZOOM_IN"
        });
      }
      if (event.keyCode === 189) {
        event.preventDefault();
        if (zoom + 50 > 800) return;
        store.dispatch({
          type: "ZOOM_OUT"
        });
      }
      if (event.keyCode === 80) {
        event.preventDefault();
        publish();
        // create a canvas from state
      }
    }
  };

  window.onkeyup = ({ keyCode }) => {
    if (keyCode === 17) {
      store.dispatch({ type: "CTRL_UP" });
    }
  };

  window.onmousemove = throttle(
    event => {
      const {
        mouseIsDown,
        ctrlIsDown,
        oldMouseX,
        oldMouseY,
        mouseIsOverSvg,
        svgX,
        svgY
      } = store.getState();
      const { clientX, clientY } = event;
      store.dispatch({
        type: "MOUSE_MOVE",
        payload: {
          mouseX: clientX,
          mouseY: clientY
        }
      });
      if (mouseIsOverSvg && mouseIsDown && ctrlIsDown) {
        let xOffset = clientX - oldMouseX;
        let yOffset = clientY - oldMouseY;
        if (svgX - xOffset < -20 || svgX - xOffset > 100) xOffset = 0;
        if (svgY - yOffset < -20 || svgY - yOffset > 100) yOffset = 0;
        store.dispatch({
          type: "SVG_DRAG",
          payload: {
            xOffset,
            yOffset
          }
        });
        return;
      }
      if (mouseIsDown && mouseIsOverSvg) {
        updateCells();
      }
    },
    10,
    {
      leading: true
    }
  );

  window.onmousedown = () => {
    store.dispatch({
      type: "MOUSE_DOWN"
    });

    const { mouseIsOverSvg } = store.getState();
    if (mouseIsOverSvg) {
      updateCells();
    }
  };

  window.onmouseup = () => {
    store.dispatch({
      type: "MOUSE_UP"
    });
  };
};
