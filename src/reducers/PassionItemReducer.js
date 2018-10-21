import { FETCH_PASSION_ITEMS_SUCCESS,
  ADD_PASSION, SET_PASSION, ADD_THUMBNAIL,
  FETCH_THUMBNAIL_SUCCESS, DELETE_THUMBNAIL,
  FETCH_PASSION } from '../actions/types';

const INITIAL_STATE = {
  passionItems: {},
  passion: {},
  thumbnail: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PASSION_ITEMS_SUCCESS:
      return { ...state, passionItems: action.payload };
    case ADD_PASSION:
      return { ...state };
    case SET_PASSION:
      return { ...state, passion: action.payload };
    case ADD_THUMBNAIL:
      return { ...state, thumbnail: action.payload};
    case FETCH_THUMBNAIL_SUCCESS:
      return { ...state, thumbnail: action.payload };
    case DELETE_THUMBNAIL:
      return { ...state, thumbnail: {}};
    case FETCH_PASSION:
      return { ...state, passion: action.payload };
    default:
      return state;
  }
};
