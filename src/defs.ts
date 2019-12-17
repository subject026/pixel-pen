interface TAction {
  type: string;
  payload?: TPayload;
}

interface TPayload {
  [key: string]: string | number;
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
  cells: Record<string, TCell>;
  currentColor: string;
  colors: Array<string>;
}

interface TStyledProps {
  [key: string]: string;
}

interface TCell {
  x: number;
  y: number;
  color: string;
}
