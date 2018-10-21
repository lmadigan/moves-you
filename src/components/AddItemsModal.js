import React, { Component } from 'react';
import { Modal, View, Text, Image, CameraRoll,
  Dimensions, TouchableOpacity, ScrollView, Keyboard,
  KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LinkPreview from 'react-native-link-preview';
import { Permissions, ImagePicker } from 'expo';
import { CardSection, Button, Input } from './common';
import { CircleCheck, PlusButtonSkinny, ArrowLeft, CheckBox } from './symbols';
import AddLabel from './AddLabel';
import AddDescription from './AddDescription';
import AddLocation from './AddLocation';
import MultiPhotoUpload from './MultiPhotoUpload';
import PhotosPreview from './PhotosPreview';
import { addContent, setPassion } from '../actions';




class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passion: this.props.passion,
      item: this.props.item,
      descriptionHeight: 100,
      labelDisplay: 'none',
      descriptionDisplay: 'none',
      locationDisplay: 'none',
      linkDisplay: 'none',
      label: '',
      description: '',
      linkText: '',
      link: {},
      photos: null,
      location: {},
      modalVisible: false,
      chosenImages: [],
      addPhotoColor: '#d9d9d9',
      visibleHeight: Dimensions.get('window').height
    };
    this.onBack = this.onBack.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.addDescription = this.addDescription.bind(this);
    this.addLink = this.addLink.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onAddContent = this.onAddContent.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.renderLink = this.renderLink.bind(this);
    this.onAddPhotos = this.onAddPhotos.bind(this);
    this._getPhotosAsync = this._getPhotosAsync.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this.renderPhotos = this.renderPhotos.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.cancelPhotos = this.cancelPhotos.bind(this);
    this.previewPhotos = this.previewPhotos.bind(this);
    this.setImageOpacity = this.setImageOpacity.bind(this);
    this.onSelectLocation = this.onSelectLocation.bind(this);
  }


  onBack() {
    const passion = this.props.passion;
    Actions.passionView({ passion });
  }

  addLabel() {
    const label = ( this.state.labelDisplay === 'none' ) ? 'flex' : 'none';
    this.setState({ labelDisplay: label });
  }

  addDescription() {
    const desc = ( this.state.descriptionDisplay === 'none' ) ? 'flex' : 'none';
    this.setState({ descriptionDisplay: desc});
  }

  addLocation() {
    const location = ( this.state.locationDisplay === 'none' ) ? 'flex' : 'none';
    this.setState({ locationDisplay: location });
  }

  addLink() {
    const link = ( this.state.linkDisplay === 'none' ) ? 'flex' : 'none';
    this.setState({ linkDisplay: link });
  }


  onChangeLabel(text) {
    this.setState({label: text});
  }

  onChangeDescription(text) {
    this.setState({description: text});
  }

  onChangeLink(text) {
    this.setState({ link: text });
    LinkPreview.getPreview(text)
      .then(data => {
        if(data.description === undefined) {
          data.description = ""
          this.setState({ link: data});
        } else {
          this.setState({ link: data});
        }
      });
  }

  renderLink() {
    if ( this.state.link.url ) {
      const imageUrl = this.state.link.images[0];
      return (
        <View style={styles.linkViewStyle}>
          <Image
            style={{height: 50, width: 50 }}
            source={{uri: imageUrl}} />
          <Text style={{ paddingLeft: 10 }}>
            {this.state.link.title}
          </Text>
        </View>
      );
    }
  }

  onAddPhotos() {
    this._getPhotosAsync();
    this.setState({ modalVisible: true});
  }

  async _getPhotosAsync() {
   let photos = await CameraRoll.getPhotos({ first: 100 });
   this.setState({ photos });
   this._renderPhotos(photos);
 }

   _renderPhoto(photos) {
     let images = [];
    const edges = photos.edges;
    const imageStyle = styles.imageContainer;
    const scope = this;
    const photoSize = photoWidth*2;


    edges.forEach(edge => {
      let image = edge.node.image;
      let imageRef = image.filename;
      let imageOpacity = this.setImageOpacity(image);
      images.push(
        <TouchableOpacity
          key={edge.node.image.filename}
          onPress={ () => this.chooseImage(image)}
          activeOpacity={1}>
          <View
            ref={imageRef}
            style={ imageStyle }>
            <Image
              source={{uri: image.uri}}
              resizeMode="contain"
              style={{ minHeight: photoSize,
                minWidth: photoSize,
                resizeMode: 'contain',
                opacity: imageOpacity }}
            />
          </View>
        </TouchableOpacity>
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

  setImageOpacity(image) {
    let images = this.state.chosenImages;
    for ( let i = 0; i < images.length; i++ ) {
      if (images[i].filename === image.filename) {
        return 0.7;
      }
    }
      return 1;
  }

  chooseImage(image) {
    let images =  this.state.chosenImages;
    let imageRef = image.filename;
    if (images.includes(image)) {
      this.refs[imageRef].setNativeProps({
         opacity: 1
       });
       let ind = images.indexOf(image);
       images.splice(ind, 1);
    } else {
    this.refs[imageRef].setNativeProps({
       opacity: 0.7
     });
     images.push(image);
     this.setState({
       chosenImages: images
     });

    }

    if (images.length > 0) {
      this.setState({
        addPhotoColor: '#0099cc'
      })
    } else {
      this.setState({
        addPhotoColor: '#d9d9d9'
      })
    }
  }

  cancelPhotos() {
    this.setState({
      modalVisible: false,
      chosenImages: []
    });
  }

  previewPhotos() {
    let images = this.state.chosenImages;
    if ( images.length > 0 ) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
           <PhotosPreview images={images}/>
        </ScrollView>
      );
    }
  }

  onSelectLocation(location) {
    this.setState({ location });
  }

  onAddContent() {
    const state = this.state;
    this.props.addContent(state);
  }

  render(){
    const { addPhotoColor } = this.state;
    const { viewStyle, containerStyle,
      sectionStyle, textStyle, locationStyle, headerStyle, headerViewStyle,
      homeStyle, leftStyle, outterContainer } = styles;

    const { labelDisplay, descriptionDisplay, locationDisplay,
    linkDisplay } = this.state;

    const visibleHeight = this.visibleHeight;

    return(
      <KeyboardAvoidingView behavior="padding" style={outterContainer}>
        <View style={headerStyle}>
          <View style={headerViewStyle}>
            <View style={leftStyle}>
              <ArrowLeft onPress={this.onBack} />
            </View>
            <Text style={homeStyle}>{'Add New Content Below'}</Text>
            <TouchableOpacity
            style={{ paddingRight: 15, paddingBottom: 10}}
            onPress={this.onAddContent}
            >
              <CheckBox size={25}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexShrink: 1 }}>
        <ScrollView
          style={containerStyle}
          keyboardShouldPersistTaps='handled'>

          <View style={{height: 40 }}>
            <AddLabel
              onChangeText={this.onChangeLabel}
              placeholder="Add Label..."
              />
          </View>
          <View style={{height: 150 }}>
            <AddDescription
            onChangeText={this.onChangeDescription}
            />
          </View>
          <View style={{ height: 250 }}>
            <AddLocation onSelectLocation={this.onSelectLocation}/>
          </View>
          <TouchableOpacity onPress={this.onAddPhotos}>
              <View style={sectionStyle}>
                <Text style={textStyle}>Add Photos</Text>
              </View>
          </TouchableOpacity>
          {this.previewPhotos()}

          <View style={{height: 40, backgroundColor: 'white'}}>
            <AddLabel
              onChangeText={this.onChangeLink}
              placeholder="Enter hyperlink..."/>
          </View>
          {this.renderLink()}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
          <View style={styles.modalStyle}>
            <View style={styles.topContainer}>
              <Text style={styles.photosText}>Photos</Text>
              <TouchableOpacity
              onPress={() => this.cancelPhotos()}
              style={{ position: 'absolute', right: 15 }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            {this.renderPhotos()}
            <View style={{ ...styles.addContainer, borderColor: addPhotoColor }}>
              <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}>
                <Text style={{ ...styles.addPhotoText, color: addPhotoColor }}>Add Photos</Text>
              </TouchableOpacity>
            </View>
          </View>
          </Modal>

        </ScrollView>
        </View>
        <View style={{ height: 20 }} />
      </KeyboardAvoidingView>

    );
  }
}

const width = Dimensions.get("window").width;
const photoWidth = width/4 - 4;
const height = Dimensions.get("window").height;

const styles = {
  outterContainer:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EBEBEE'
  },
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
    shadowOpacity: 0.7,
    marginBottom: 10
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
  viewStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexShrink: 1
  },
  leftStyle: {
    paddingLeft: 20
  },
  containerStyle: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginRight: 15,
    marginBottom: 20,
    marginLeft: 15,
    borderRadius: 10
  },
  sectionStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  textStyle:{
    fontSize: 20,
    color: '#CFCFCF'
  },
  locationStyle: {
    height: 150
  },
  linkViewStyle: {
    height: 60,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  modalStyle: {
    height: height,
    width: width,
    backgroundColor: 'white',
    top: 30,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  container: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap'
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
    cancelText: {
      fontSize: 18,
      color: '#0099cc'
    },
    text: {
      flex: 3
    },
    addContainer: {
      width: width,
      height: 40,
      bottom: 40,
      borderTopWidth: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
    },
    addPhotoText: {
      fontSize: 20,
      backgroundColor: 'white'
    }
};

const mapStateToProps = (state) => {
  const currentPassion = state.passions.passion;

  return {
    currentPassion: currentPassion,
  };
};

export default connect(mapStateToProps, { addContent, setPassion })(AddItem);
