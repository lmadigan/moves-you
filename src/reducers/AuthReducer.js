import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOAD_FONT } from '../actions/types';

const INITIAL_STATE = {
      email: '',
      password: '',
      user: null,
      error: '',
      loading: false,
      fontLoaded: false
  };

export default (state = INITIAL_STATE , action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload.message, loading: false };
    case LOAD_FONT:
      return { ...state, fontLoaded: true };
    default:
      return state;
  }
};
