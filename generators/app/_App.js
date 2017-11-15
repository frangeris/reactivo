import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from '@store'
import bootstrap from '@config/bootstrap'
import Routes from '@config/routes'

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    )
  }
}
