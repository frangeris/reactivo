import React from 'react'
import { Actions, Scene, Switch } from 'react-native-router-flux'
import { connect } from 'react-redux'
import store from '@store'

export default Actions.create(
  <Scene
    key="root"
    component={ connect((state) => ({ state: state.user }))(Switch) }
    selector={ props => props.logged ? 'auth' : 'anon' }
    tabs
    unmountScenes
  >
    <Scene key="anon" hideNavBar>
      {/* <Scene key="onboard" component={Onboard} /> */}
    </Scene>
    <Scene key="auth" showNavigationBar>
      {/* <Scene key="home" component={Home} type='reset' initial /> */}
    </Scene>
  </Scene>
)
