interface TAction {
  type: string;
  payload: TPayload;
}

interface TPayload {
  [key: string]: any;
}

interface TState {
  ctrlIsDown: boolean;
  mouseIsDown: boolean;
  mouseX: boolean;
  mouseY: boolean;
  oldMouseX: boolean;
  oldMouseY: boolean;
  mouseIsOverSvg: boolean;
  svgX: number;
  svgY: number;
  zoom: number;
  cells: {
    [key: string]: any;
  };
  currentColor: string;
  colors: Array<string>;
}

interface TProps {
  [key: string]: any;
}
