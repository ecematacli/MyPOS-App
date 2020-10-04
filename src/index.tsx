import 'react-hot-loader/patch';
import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader';
import App from './App'

const render = (Component: React.ComponentType<any>) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  })
}

