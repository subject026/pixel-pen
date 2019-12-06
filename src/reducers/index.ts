const initialState = {
  ctrlIsDown: null,
  mouseIsDown: null,
  mouseX: 0,
  mouseY: 0,
  oldMouseX: 0,
  oldMouseY: 0,
  svgX: 0,
  svgY: 0,
  zoom: 500,
  cells: {},
  currentColor: "pink",
  colors: ["pink", "red", "purple"]
};

export const mainReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "CTRL_DOWN":
      newState = {
        ...state,
        ctrlIsDown: true
      };
      return newState;
    case "CTRL_UP":
      newState = {
        ...state,
        ctrlIsDown: false
      };
      return newState;
    case "MOUSE_DOWN":
      newState = {
        ...state,
        mouseIsDown: true
      };
      return newState;
    case "MOUSE_UP":
      newState = {
        ...state,
        mouseIsDown: false
      };
      return newState;
    case "MOUSE_MOVE":
      const { mouseX, mouseY } = action.payload;
      newState = {
        ...state,
        mouseX,
        mouseY,
        oldMouseX: state.mouseX,
        oldMouseY: state.mouseY
      };
      return newState;
    case "SVG_DRAG":
      const { xOffset, yOffset } = action.payload;
      newState = {
        ...state,
        svgX: state.svgX - xOffset,
        svgY: state.svgY - yOffset
      };
      return newState;
    case "ADD_CELL":
      const { cellKey, x, y, color } = action.payload;
      newState = {
        ...state,
        cells: {
          ...state.cells,
          [cellKey]: {
            x,
            y,
            color
          }
        }
      };
      return newState;
    case "ZOOM_IN":
      newState = {
        ...state,
        zoom: state.zoom - 50
      };
      return newState;
    case "ZOOM_OUT":
      newState = {
        ...state,
        zoom: state.zoom + 50
      };
      return newState;
    case "ADD_COLOR":
      newState = {
        ...state,
        colors: [...state.colors, action.payload]
      };
      return newState;
    case "CHANGE_COLOR":
      newState = {
        ...state,
        currentColor: action.payload
      };
      return newState;
    case "UPDATE_CELL":
      const newCells = { ...state.cells };
      console.log(action.payload.cellKey);
      newCells[action.payload.cellKey] = {
        ...state.cells[action.payload.cellKey],
        color: action.payload.currentColor
      };
      newState = {
        ...state,
        cells: { ...newCells }
      };
      return newState;
    default:
      return state;
  }
};
