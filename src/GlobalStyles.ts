import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 30px white inset !important;
    
}

`
