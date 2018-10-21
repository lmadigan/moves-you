import { FETCH_PASSION_ITEMS_SUCCESS,
  ADD_PASSION, SET_PASSION, FETCH_PASSION_ITEM,
  ADD_THUMBNAIL, FETCH_THUMBNAIL_SUCCESS, LOGIN_USER_SUCCESS,
  DELETE_THUMBNAIL, FETCH_PASSION } from './types';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

export const fetchPassions = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/passions`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_PASSION_ITEMS_SUCCESS, payload: snapshot.val()});
    });
  };
};


export const addPassion = ({ passion }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/passions`)
    .push({ name: passion })
    .then(() => {
      dispatch({ type: ADD_PASSION, payload: passion });
    });
  };
};

export const addThumbNail = (thumbnail) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/thumbnail`)
    .push({thumbnail});
  };
};

export const fetchThumbnail = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/thumbnail`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_THUMBNAIL_SUCCESS, payload: snapshot.val()});
    });

  };
};

export const fetchPassion = ({ passion }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/passions/${passion.uid}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_PASSION, payload: snapshot.val()});
    });
  };
};

export const deleteThumbnail = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/thumbnail`).remove();
    dispatch({ type: DELETE_THUMBNAIL });
  };
};

export const setPassion = ( passion ) => {
  return (dispatch) => {
    dispatch({type: SET_PASSION, payload: passion});

    Actions.passionView({ passion });
  };
};

export const deletePassion = ( passion ) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/passions/${passion.uid}`).remove();
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};
