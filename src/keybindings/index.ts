import throttle from "lodash.throttle";

import { store } from "../store";

const roundDown = num => {
  if (num % 20 !== 0) {
    return roundDown(num - 1);
  } else {
    return num;
  }
};

export const attachKeybindings = svgRef => {
  window.onkeydown = event => {
    const { ctrlIsDown } = store.getState();
    if (event.keyCode === 17) {
      store.dispatch({ type: "CTRL_DOWN" });
    }
    if (event.keyCode === 187) {
      if (ctrlIsDown) {
        event.preventDefault();
        store.dispatch({
          type: "ZOOM_IN"
        });
      }
    }
    if (event.keyCode === 189) {
      if (ctrlIsDown) {
        event.preventDefault();
        store.dispatch({
          type: "ZOOM_OUT"
        });
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
        mouseX,
        mouseY,
        oldMouseX,
        oldMouseY,
        cells,
        currentColor
      } = store.getState();
      const { clientX, clientY } = event;
      store.dispatch({
        type: "MOUSE_MOVE",
        payload: {
          mouseX: clientX,
          mouseY: clientY
        }
      });
      if (mouseIsDown && ctrlIsDown) {
        const xOffset = clientX - oldMouseX;
        const yOffset = clientY - oldMouseY;
        store.dispatch({
          type: "SVG_DRAG",
          payload: {
            xOffset,
            yOffset
          }
        });
        return;
      }
      if (mouseIsDown) {
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
      }
    },
    10,
    {
      leading: true
    }
  );

  window.onmousedown = ({ mouseX, mouseY, currentColor, cells }) => {
    store.dispatch({
      type: "MOUSE_DOWN"
    });
  };

  window.onmouseup = () => {
    store.dispatch({
      type: "MOUSE_UP"
    });
  };
};
