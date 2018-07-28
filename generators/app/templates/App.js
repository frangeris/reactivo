import React from 'react'
import '@config/bootstrap'
import Router from '@config/router'
import store from '@store'
import { Provider } from 'mobx-react'

export default class App extends React.Component {
  render () {
    return (
      <Provider {...store}>
        <Router />
      </Provider>
    )
  }
}
