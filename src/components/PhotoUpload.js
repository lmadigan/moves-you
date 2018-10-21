import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Images } from './symbols';

const PhotoUpload = ({ onPress, children }) => {
  const { buttonStyle, viewStyle, textStyle, outterViewStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <View style={viewStyle}>
        <Images />
        <Text style={textStyle}>Upload Photo</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    backgroundColor: 'white',
    color: '#DFDCDC',
    paddingTop: 10
  },
  viewStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DFDCDC',
    borderStyle: 'dashed',
    backgroundColor: 'white',
    margin: 15,
    height: 270,
    width: viewWidth,
    alignSelf: 'stretch'
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 300,
    width: width,
    marginTop: 10,
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 1,
    marginBottom: 5
  }
};

const width = Dimensions.get("window").width;
const viewWidth = width - 20;
const height = Dimensions.get("window").height;

export default PhotoUpload;

// return (
//   <TouchableOpacity onPress={onPress} style={buttonStyle}>
//     <View style={viewStyle}>
//       <Images />
//       <Text style={textStyle}>Upload Photo</Text>
//     </View>
//   </TouchableOpacity>
// );
// };
//
// const styles = {
// textStyle: {
//   color: '#DFDCDC',
//   paddingTop: 10
// },
// viewStyle: {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   paddingTop: 10,
//   paddingBottom: 10
// },
// buttonStyle: {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   alignSelf: 'stretch',
//   backgroundColor: '#fff',
//   borderRadius: 5,
//   borderWidth: 1,
//   borderColor: '#DFDCDC',
//   borderStyle: 'dashed',
//   height: 300
// }
// };
