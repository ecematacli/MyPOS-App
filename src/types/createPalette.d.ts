import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface AdditionalColorOptions {
    grayColors?: string[];
    greenColors?: string[];
    yellowColors?: string[];
    blueColors?: string[];
    navyBlueColors?: string[];
    whiteColors?: string[];
  }
  interface PaletteOptions {
    grayColors?: AdditionalColorOptions;
    greenColors?: AdditionalColorOptions;
    yellowColors?: AdditionalColorOptions;
    blueColors?: AdditionalColorOptions;
    navyBlueColors?: AdditionalColorOptions;
    whiteColors?: AdditionalColorOptions;
  }
  interface AdditionalColor {
    grayColors: string[];
    greenColors: string[];
    yellowColors: string[];
    blueColors: string[];
    navyBlueColors: string[];
    whiteColors: string[];
  }

  interface Palette {
    grayColors: AdditionalColor;
    greenColors: AdditionalColor;
    yellowColors: AdditionalColor;
    blueColors: AdditionalColor;
    navyBlueColors: AdditionalColor;
    whiteColors: AdditionalColor;
  }
}
