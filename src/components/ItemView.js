import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, ScrollView,
      Dimensions, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import PhotosPreview from './PhotosPreview';
import { ArrowLeft } from './symbols';
import Location from './Location';

class ItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passion: this.props.passion,
      item: this.props.item
    };
    this.onBack = this.onBack.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderLocation = this.renderLocation.bind(this);
    this.renderPhotos = this.renderPhotos.bind(this);
    this.renderLink = this.renderLink.bind(this);
    this.onPressLink = this.onPressLink.bind(this);
    this.onPhotoView = this.onPhotoView.bind(this);
  }

  onBack(){
    const passion = this.props.passion;
    Actions.passionView({ passion });
  }

  renderDescription() {
    const {descriptionViewStyle, descriptionTextStyle} = styles;
    const description = this.state.item.val.content[0].description;

    if ( description ) {
      return(
        <View style={descriptionViewStyle}>
          <Text style={descriptionTextStyle}>
            {description}
          </Text>
        </View>
      );
    }
  }

  renderLocation() {
    const location = this.state.item.val.content[0].location;

    if ( location ) {
      return(
        <Location location={location} />
      );
    }
  }

  renderPhotos() {
    const photos = this.state.item.val.content[0].photos;

    if (photos) {
      return(
        <View style={styles.photoContainer}>
           <PhotosPreview images={photos}/>
        </View>
      );
    }
  }

  renderLink() {
    const { containerStyle, subtitleStyle, innerContainerStyle,
          subtitleText, linkTextViewStyle, linkDescriptionViewStyle } = styles;
    const { link } = this.state.item.val.content[0];
    if ( link ) {
      const imageUrl = link.images[0];
      return (


          <View style={containerStyle}>
            <View style={subtitleStyle}>
              <TouchableOpacity style={innerContainerStyle} onPress={() => this.onPressLink(link)}>
                <Text style={subtitleText}>{link.title}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.linkView}>
                <Image
                  style={{height: 70, width: 70 }}
                  source={{uri: imageUrl}} />
                <View style={linkTextViewStyle}>
                  <Text style={{ paddingLeft: 15, paddingRight: 5 }}>
                    {link.description}
                  </Text>
                </View>
            </View>
          </View>

      );
    }
  }

  onPressLink(link) {
    Linking.openURL(link.url);
  }

  onPhotoView() {
    let photos = this.state.item.val.content[0].photos;
    Actions.photosView({photos });
  }

  render() {
    const { headerStyle, headerViewStyle, leftStyle, homeStyle,
          viewStyle, titleViewStyle, titleStyle,
        descriptionViewStyle, descriptionTextStyle,
        containerStyle, subtitleStyle, subtitleText,
        innerContainerStyle } = styles;

    return (
      <View style={styles.outterContainer}>

        <View style={headerStyle}>
          <View style={headerViewStyle}>
            <View style={leftStyle}>
              <ArrowLeft onPress={this.onBack} />
            </View>
            <Text style={homeStyle}>{this.state.item.val.title}</Text>
            <TouchableOpacity
            style={{ paddingRight: 15, paddingBottom: 10}}
            >
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexShrink: 1}}>
          <ScrollView>
          <View style={styles.containerStyle}>
            <View style={titleViewStyle}>
              <Text style={titleStyle}>{this.state.item.val.content[0].label}</Text>
              </View>
            {this.renderDescription()}
            {this.renderLocation()}
          </View>
          <TouchableOpacity
          style={containerStyle}
          onPress={this.onPhotoView}>
            <View style={subtitleStyle}>
              <View style={innerContainerStyle}>
                <Text style={subtitleText}>Photos</Text>
              </View>
              </View>
            {this.renderPhotos()}
          </TouchableOpacity>
          <View style={styles.containerStyle}>
            {this.renderLink()}
          </View>
        </ScrollView>
        </View>
      </View>
    );
  }
}

const width = Dimensions.get("window").width;
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
  containerStyle: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginRight: 15,
    marginBottom: 15,
    marginLeft: 15,
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#ccc',
    shadowRadius: 1,
    shadowOpacity: 0.7,
  },
  innerContainerStyle:{
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center'
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
    paddingLeft: 10
  },
  titleViewStyle:{
    top: 10,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EBEBEE',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  titleStyle: {
    height:50,
    fontSize:35,
    color: '#103247',
    borderBottomColor: '#326C92',
    borderBottomWidth: 0.5
  },
  descriptionViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  },
  descriptionTextStyle: {
    color: '#64676A',
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  photoContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'stretch'
    },
    linkViewStyle: {
      height: 60,
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      margin: 10,
      alignItems: 'center'
    },
    linkView:{
      display: 'flex',
      flexDirection: 'row'
    },
    subtitleStyle: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
      paddingBottom: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#EBEBEE'
    },
    subtitleText:{
      fontSize: 20,
      color: '#326C92'
    },
    linkTextViewStyle: {
      width: 0,
      flexGrow: 1,
      flex: 1
    }
};



export default ItemView;
