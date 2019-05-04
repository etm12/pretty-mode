declare interface IDraggable {
  size: { width: number, height: number };
  position: { x: number, y: number };
  locked: boolean;
  moving?: boolean;
  content: string;
}

declare interface IDraggableContentStyle {
  fontSize?: number;
  fontFamily?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
}

declare interface IDraggableGeometry {
  width: number;
  height: number;
  x: number;
  y: number;
}

declare interface IDraggableFlags {
  locked?: boolean;
  moving?: boolean;
  editing?: boolean;
  styling?: boolean;
}

declare interface IDraggableProps {
  geometry: IDraggableGeometry;
  flags: IDraggableFlags;
  content: string;
  style: IDraggableContentStyle;
}

//

declare interface IState {
  defaults: {
    style: IDraggableContentStyle;
  };
  items: Array<IDraggableProps>;
}
