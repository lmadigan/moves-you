import React, { Component } from 'react';
import { TextInput, View, Text, Dimensions, Image, ScrollView } from 'react-native';

class PhotosView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: this.props.photos
    };
    this.renderPhotos = this.renderPhotos.bind(this);
  }

  renderPhotos() {
    let images = this.state.photos;

    let imageArray = [];
    images.forEach(image => {
      imageArray.push(
       <View
         style={ styles.imageContainer }>
         <Image
          source={{uri: image.uri}}
          resizeMode="contain"
          style={{ minWidth: photoContainer, minHeight: photoContainer, resizeMode: 'contain' }}
         />
       </View>);
    });
    return imageArray;
  }

  render() {
    return (
      <View style={styles.outterContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.photosText}>Photos</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderPhotos()}
      </ScrollView>
      </View>
    );
  }
}

const width = Dimensions.get("window").width - 6;
const photoWidth = width/4 - 4;
const photoContainer = photoWidth*2;
const height = Dimensions.get("window").height;

const styles = {
  outterContainer: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  topContainer: {
    height: 30,
    marginTop: 15,
    width: width,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pageStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  photosText: {
    color: '#64676A',
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    justifyContent: 'center'
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

export default PhotosView;
