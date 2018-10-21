import { ADD_LABEL, ADD_DESCRIPTION } from './types';
import { fetchPassion } from './PassionItemActions';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';


export const addContent = (state) => {
  const { currentUser } = firebase.auth();
  const { passion, label, description, chosenImages,
          link, location, item} = state;
  const content = {
    label: label,
    description: description,
    photos: chosenImages,
    link: link,
    location: location
  };
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/passions/${passion.uid}/items/${item.key}/content`)
      .push(content);
    Actions.passionView({ passion });
  };
};

export const addItem = (state) => {

  const { currentUser } = firebase.auth();
  const { passion, item } = state;
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/passions/${passion.uid}/items`)
    .push({title: item});
    Actions.passionView({ passion });

  };
};

export const deleteItem = (state) => {
  let item = state.item;
  let passion = state.passion;
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/passions/${passion.uid}/items/${item.key}`).remove();
  };
};
