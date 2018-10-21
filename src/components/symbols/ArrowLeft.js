import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ArrowLeft = ({ onPress }) => {
  return (
     <TouchableOpacity onPress={onPress}>
      <Icon name="arrow-left" size={25} color='#F4F4F4' />
    </TouchableOpacity>
  );
};
export { ArrowLeft };
