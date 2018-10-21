import React, { Component } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView,
  Dimensions, TextInput, TouchableOpacity } from 'react-native';

class EditProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { headerStyle, headerViewStyle, outterContainer,
      homeStyle, viewStyle } = styles;
    return(
      <KeyboardAvoidingView behavior="padding" style={outterContainer}>
        <View style={headerStyle}>
          <View style={headerViewStyle}>
            <TouchableOpacity style={{ paddingLeft: 15 }} >
              <Text></Text>
            </TouchableOpacity>
            <Text style={homeStyle}>Edit Profile</Text>
            <View></View>
          </View>
        </View>
        <View style={viewStyle}>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = {
  headerStyle:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: width,
    height: 80,
    backgroundColor: 'white',
    shadowOffset:{  width: 0,  height: 1 },
    shadowColor: 'grey',
    shadowRadius: 1,
    shadowOpacity: 0.7
  },
  headerViewStyle:{
    width: width,
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  homeStyle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  outterContainer:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#EBEBEE',
    display: 'flex',
    justifyContent: 'flex-start',
    flexShrink: 1
  },
  viewStyle:{
    display: 'flex',
    flexDirection: 'column'
  }
};

export default EditProfile;
