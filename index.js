import { AppRegistry } from 'react-native';
import App from './src/App';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './src/reducers';

AppRegistry.registerComponent('passions', () => App);

export const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));