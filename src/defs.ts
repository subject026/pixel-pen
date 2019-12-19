interface TAction {
  type: string;
  payload?: TNumberPayload | TStringPayload | TCellPayload;
}

interface TNumberPayload {
  [key: string]: number;
}

interface TStringPayload {
  [key: string]: string;
}

interface TCellPayload {
  cellKey: string;
  x: number;
  y: number;
  color: string;
}

interface TState {
  ctrlIsDown: boolean;
  mouseIsDown: boolean;
  mouseX: number;
  mouseY: number;
  oldMouseX: number;
  oldMouseY: number;
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
