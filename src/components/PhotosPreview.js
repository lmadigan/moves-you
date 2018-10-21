import React from 'react';
import { TextInput, View, Text, Dimensions, Image,  } from 'react-native';

const PhotoPreview = ({ images }) => {
  if ( images.length <= 7 ) {
    let imageArray = [];
      images.forEach(image => {
        imageArray.push(
         <View
          key={image.uri}
           style={ styles.imageContainer }>
           <Image
            source={{uri: image.uri}}
            resizeMode="contain"
            style={{ minWidth: photoContainer, minHeight: photoContainer, resizeMode: 'contain' }}
           />
         </View>);
    });
    return imageArray;
  } if ( images.length > 7 ) {
    let imageArray = [];
    let viewImages = images.slice(0,7);
      viewImages.forEach(image => {
        imageArray.push(
         <View
          key={image.uri}
           style={ styles.imageContainer }>
           <Image
            source={{uri: image.uri}}
            resizeMode="contain"
            style={{ minWidth: photoContainer, minHeight: photoContainer, resizeMode: 'contain' }}
           />
         </View>);
    });
    let num = images.length - 7;
    imageArray.push(
      <View
        key={num}
        style={styles.numContainer}>
        <Text style={styles.plusStyle}>+</Text>
        <Text style={styles.numStyle}>{num}</Text>
      </View>
    );
    return imageArray;
  }

};

const width = Dimensions.get("window").width - 30;
const photoWidth = width/4 - 4;
const photoContainer = photoWidth*2;
const height = Dimensions.get("window").height;

const styles = {
  container: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',

    },
    imageContainer: {
      height: photoWidth,
      width: photoWidth,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 1,
      overflow: 'hidden'
    },
    numStyle: {
      fontSize: 25,
      color: '#E0E0E0'
    },
    plusStyle:{
      fontSize: 15,
      color: '#E0E0E0'
    },
    numContainer: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 1,
      height: photoWidth,
      width: photoWidth,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      margin: 1,
      overflow: 'hidden'
    }
};

export default PhotoPreview;
