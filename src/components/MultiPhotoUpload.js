import React, { Component } from 'react';
import { Modal, View, Text, Image, CameraRoll,
  Dimensions, TouchableOpacity, ScrollView } from 'react-native';


class MultiPhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      modalVisible: false
    };
    this._getPhotosAsync = this._getPhotosAsync.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this.renderPhotos = this.renderPhotos.bind(this);

  }

  componentWillMount() {
    this._getPhotosAsync();
  }

    async _getPhotosAsync() {
     let photos = await CameraRoll.getPhotos({ first: 100 });
     this.setState({ photos });
     this._renderPhotos(photos);
   }

   _renderPhoto(photos) {
     let images = [];
    const edges = photos.edges;

    edges.forEach(edge => {
      let image = edge.node.image.uri;
      images.push(
        <View style={styles.imageContainer}>
          <Image
            key={edge.node.image.uri}
            source={{uri: image}}
            resizeMode="contain"
            style={{ minHeight: 130, minWidth: 130, resizeMode: 'contain' }}
          />
        </View>
      );
    });
    return images;
  }

  renderPhotos() {
    const photos = this.state.photos;
    if ( photos ) {
      return (
         <ScrollView contentContainerStyle={styles.container}>
            {this._renderPhoto(photos)}
         </ScrollView>
       );
    }
  }

  render() {
    return (
      <View style={styles.pageStyle}>
        <View style={styles.topContainer}>
          <Text />
          <Text style={styles.text}>Photos</Text>
          <Text style={styles.text}>Cancel</Text>
          <Text>Hello</Text>
        </View>
        {this.renderPhotos()}
      </View>
    );
  }

}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const photoWidth = width/4;

const styles = {
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 'grow',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  imageContainer: {
    height: 88,
    width: 88,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    overflow: 'hidden'
  },
  topContainer: {
    height: 30,
    flex: 1,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  text: {
    color: 'black',
    fontSize: 20
  }
};

export default MultiPhotoUpload;
