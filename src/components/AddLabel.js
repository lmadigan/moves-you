import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { addLabel } from '../actions';

class AddLabel extends Component{
  constructor(props) {
    super(props);
    this.state = {
      label: ''
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {

    this.props.onChangeText(text);
  }

  render(){
    const { containerStyle, inputStyle } = styles;
    return(
      <View style={containerStyle}>
        <TextInput
          placeholder={this.props.placeholder}
          autoCorrect={false}
          onChangeText={this.onChangeText.bind(this)}
          style={inputStyle}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.auth.user;
  const currentPassion = state.passions.passion;

  return {
    currentUser: currentUser,
    currentPassion: currentPassion
  };
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 20,
    flex: 2
  },
  containerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 1
  }
};

export default connect(mapStateToProps, { addLabel })(AddLabel);
