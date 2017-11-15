import React, { Component } from 'react'
import { Router, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Scenes from '@config/scenes'

class Custom extends Component {
  reducerCreate(params) {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  }

  render() {
    return <Router createReducer={this.reducerCreate.bind(this)} scenes={Scenes} />
  }
}

export default connect((state) => ({ state: state.route }))(Custom)
