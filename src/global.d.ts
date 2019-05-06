declare namespace App {
  namespace Utils {
    function not<T>(v: T): boolean;
  }
  namespace Component {
    namespace Draggable {
      interface Props {
        geometry: IDraggableGeometry;
        flags: IDraggableFlags;
        content: string;
        style: IDraggableContentStyle;
      }
    }

    namespace Icon {
      interface Props {
        size?: 'small' | 'normal' | 'large';
        children: any;
      }
    }

    namespace ResizeHandles {
      interface Props {
        directions?: ResizeDirections;
        geometry?: IDraggableGeometry;
      }
    }

    namespace Markdown {
      interface Props {
        children: (JSX.Element | JSX.Element[]);
      }
    }
  }
}

declare type ResizeDirections = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

declare interface IDraggable {
  size: { width: number, height: number };
  position: { x: number, y: number };
  locked: boolean;
  moving?: boolean;
  content: string;
  style?: any;
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

// LIBRARIES

declare module 'karet';

declare module 'karet.util';

declare module 'kefir.ramda';
declare module 'kefir.partial.lenses';

