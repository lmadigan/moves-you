import React from 'react';
import { TextInput, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { CheckCircle, CloseCircle } from './symbols';

const PassionItemEnter = ({ label, value, onChangeText, placeholder, onCheckEnter, onXEnter, onCheckClose }) => {
  const { inputStyle, labelStyle, containerStyle, checkContainerStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        onXEnter={onXEnter}
      />
        <View style={checkContainerStyle}>
          <CheckCircle onPress={onCheckEnter}/>
        </View>
    </View>
  );
};

const styles = {
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    lineHeight: 23,
    height: 40,
    width: 310,
    color: '#4c5267',
    fontSize: 20
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkContainerStyle:{
      paddingTop: 5,
      paddingRight: 5
    }
};

export { PassionItemEnter };
