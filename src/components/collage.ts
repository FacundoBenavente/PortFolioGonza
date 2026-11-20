export type CollageItem =
  | {
      kind: 'photo';
      src: string;
      alt: string;
      left: number;
      top: number;
      width: number;
      height: number;
      rotate: number;
    }
  | {
      kind: 'tape';
      left: number;
      top: number;
      width: number;
      height: number;
      rotate: number;
      opacity?: number;
    }
  | {
      kind: 'chip';
      text: string;
      /** Centro del chip */
      cx: number;
      cy: number;
      rotate: number;
      color: 'cyan' | 'magenta';
      /** Tamaño de fuente y padding en px del diseño original */
      fontPx: number;
      padXPx: number;
      padYPx: number;
    }
  | {
      kind: 'note';
      text: string;
      left: number;
      top: number;
      fontPx: number;
    };
