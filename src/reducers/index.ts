const initialState: TState = {
  ctrlIsDown: null,
  mouseIsDown: null,
  mouseX: null,
  mouseY: null,
  oldMouseX: null,
  oldMouseY: null,
  mouseIsOverSvg: false,
  svgX: 0,
  svgY: 0,
  zoom: 500,
  cells: {},
  currentColor: 'pink',
  currentBackgroundColor: 'red',
  colors: {},
};

export const mainReducer = (state: TState = initialState, action): TState => {
  switch (action.type) {
    case 'CTRL_DOWN': {
      const newState: TState = {
        ...state,
        ctrlIsDown: true,
      };
      return newState;
    }
    case 'CTRL_UP': {
      const newState: TState = {
        ...state,
        ctrlIsDown: false,
      };
      return newState;
    }
    case 'MOUSE_DOWN': {
      const newState: TState = {
        ...state,
        mouseIsDown: true,
      };
      return newState;
    }
    case 'MOUSE_UP': {
      const newState: TState = {
        ...state,
        mouseIsDown: false,
      };
      return newState;
    }
    case 'MOUSE_MOVE': {
      const { mouseX, mouseY } = action.payload;
      const newState: TState = {
        ...state,
        mouseX,
        mouseY,
        oldMouseX: state.mouseX,
        oldMouseY: state.mouseY,
      };
      return newState;
    }
    case 'SVG_ENTER': {
      const newState: TState = {
        ...state,
        mouseIsOverSvg: true,
      };
      return newState;
    }
    case 'SVG_LEAVE': {
      const newState: TState = {
        ...state,
        mouseIsOverSvg: false,
      };
      return newState;
    }

    case 'SVG_DRAG': {
      const { xOffset, yOffset } = action.payload;
      const newState: TState = {
        ...state,
        svgX: state.svgX - xOffset,
        svgY: state.svgY - yOffset,
      };
      return newState;
    }
    case 'ZOOM_IN': {
      const newState: TState = {
        ...state,
        zoom: state.zoom - 50,
      };
      return newState;
    }
    case 'ZOOM_OUT': {
      const newState: TState = {
        ...state,
        zoom: state.zoom + 50,
      };
      return newState;
    }
    case 'ADD_CELL': {
      const { colors } = state;
      const { cellKey, x, y, color } = action.payload;
      const hsl = `hsl(${colors[color].current.h}, ${colors[color].current.s}%, ${colors[color].current.l}%)`;
      console.log(hsl);
      const newState: TState = {
        ...state,
        cells: {
          ...state.cells,
          [cellKey]: {
            x,
            y,
            hsl: hsl,
          },
        },
      };
      return newState;
    }
    case 'UPDATE_CELL': {
      const newCells = { ...state.cells };
      newCells[action.payload.cellKey] = {
        ...state.cells[action.payload.cellKey],
        color: action.payload.currentColor,
      };
      const newState: TState = {
        ...state,
        cells: { ...newCells },
      };
      return newState;
    }
    default:
      return state;
    //
    // Color Stuff
    case 'ADD_COLOR': {
      const key = 'magicsawdust' + Math.random() * Math.random() * 1000;
      const color: TColor = {
        hue: 40,
        current: {
          h: 40,
          s: 100,
          l: 50,
        },
      };
      const newState: TState = {
        ...state,
        colors: { ...state.colors, [key]: color },
        currentColor: key,
      };
      return newState;
    }
    case 'CHANGE_COLOR': {
      const { key } = action.payload;
      const newState: TState = {
        ...state,
        currentColor: key,
      };
      return newState;
    }
  }
};
