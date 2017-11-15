import React from 'react'
import { Actions, Scene, Stack } from 'react-native-router-flux'
import { connect } from 'react-redux'
import store from '@store'

// views
import login from '@components/views/login'
import home from '@components/views/home'

export default Actions.create(
  <Scene
    key="root"
    selector={props => props.logged ? 'auth' : 'anon'}
    unmountScenes
  >
    <Scene key="anon" hideNavBar>
      <Scene key="login" component={login} />
    </Scene>
    <Scene key="auth" showNavigationBar>
      <Scene key="home" component={home} type='reset' initial />
    </Scene>
  </Scene>
)
