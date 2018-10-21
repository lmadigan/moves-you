import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PassionItemReducer from './PassionItemReducer';

export default combineReducers({
  auth: AuthReducer,
  passions: PassionItemReducer
});
