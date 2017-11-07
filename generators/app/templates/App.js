import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider, connect } from 'react-redux'
import { Router } from 'react-native-router-flux'
import Store from '@store'
import Scenes from '@config/scenes'
import bootstrap from '@config/bootstrap'

export default class Locky extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router scenes={Scenes} />
      </Provider>
    )
  }
}
