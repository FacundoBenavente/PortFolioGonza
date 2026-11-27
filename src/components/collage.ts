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
      /**
       * Recorte de Figma (relleno "Crop"): tamaño y posición de la imagen respecto
       * del área visible, en fracciones (w 1.2 = 120% del ancho). Sin recorte, cubre centrada.
       */
      recorte?: { x: number; y: number; w: number; h: number };
    }
  | {
      kind: 'chip';
      text: string;
      /** Centro del chip */
      cx: number;
      cy: number;
      rotate: number;
      color: 'teal' | 'pink';
      /** Tamaño de la caja, tamaño de fuente y peso, en px del diseño original */
      widthPx: number;
      heightPx: number;
      fontPx: number;
      weight: 600 | 700;
    }
  | {
      kind: 'note';
      text: string;
      left: number;
      top: number;
      fontPx: number;
    };
