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
  currentBackgroundColor: string;
  colors: Record<string, TColor>;
}

interface TColor {
  hue: number;
  current: Record<string, number>;
}

interface TStyledProps {
  [key: string]: any;
}

interface TCell {
  x: number;
  y: number;
  hsl: string;
}
