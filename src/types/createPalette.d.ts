import * as createPalette from '@material-ui/core/styles/createPalette'

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    grayColors?: string[]
    greenColors?: string[]
    yellowColors?: string[]
    blueColors?: string[]
    navyBlueColors?: string[]
    whiteColors?: string[]
  }
  interface Palette {
    grayColors: string[]
    greenColors: string[]
    yellowColors: string[]
    blueColors: string[]
    navyBlueColors: string[]
    whiteColors: string[]
  }
}
