import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app'

const root = document.getElementById('root')

if (root !== null) {
  ReactDOM.createRoot(root).render(<App />)
}
