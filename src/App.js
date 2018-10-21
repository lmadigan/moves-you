import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducer from './reducers';
import RouterComponent from './Router';
import { fontLoader } from './actions';
// import { store } from '../index';

class App extends Component {
  constructor() {
  }

  componentWillMount() {
    var config = {
      //add config here from firebasekeys
      };
      firebase.initializeApp(config);
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
          <RouterComponent />
      </Provider>
    );
  }
}

export default App;
