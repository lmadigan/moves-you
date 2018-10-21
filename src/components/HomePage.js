import React, { Component } from 'react';
import { View, Text,
  TextInput, CameraRoll, TouchableOpacity,
  Dimensions, ImagePickerIOS, ScrollView, Image,
  KeyboardAvoidingView } from 'react-native';
import { MapView, Permissions, ImagePicker } from 'expo';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from './common';
import PassionsList from './PassionsList';
import { PlusButton, CheckCircle, CloseCircle,
  User, PlusButtonSkinny } from './symbols';
import { addPassion, addThumbNail, fetchThumbnail,
  deleteThumbnail, deletePassion } from '../actions';
import { Card, CardSection, Input } from './common';
import {PassionItemEnter} from './PassionItemEnter';
import PhotoUpload from './PhotoUpload';
import { Confirm } from './common';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passion: '',
      addingItem: null,
      images: {},
      hasCameraPermission: false,
      confirm: false,
      scrollEnabled: true,
      deletePassion: false,
      deletablePassion: {}
    };
    this.pickImage = this.pickImage.bind(this);
    this.handleImagePicked = this.handleImagePicked.bind(this);
    this.renderThumbnail = this.renderThumbnail.bind(this);
    this.deleteThumbnail = this.deleteThumbnail.bind(this);
    this.renderConfirm = this.renderConfirm.bind(this);
    // this.onButtonPress = this.onButtonPress.bind(this);
    this.addNewPassion = this.addNewPassion.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);
    this.renderDeletePassion = this.renderDeletePassion.bind(this);
    this.rejectDeletePassion = this.rejectDeletePassion.bind(this);
    this.deletePassionItem = this.deletePassionItem.bind(this);
    // this.onUserPress = this.onUserPress.bind(this);
  }

  componentWillMount() {
    this.props.fetchThumbnail();
  }

  async pickImage() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);


    if ( status === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      this.handleImagePicked(pickerResult);
    } else {
      console.log(status);
    }
  }

  async handleImagePicked(pickerResult) {
    try {

     if (!pickerResult.cancelled) {
       this.props.addThumbNail(pickerResult);
     }
     } catch (e) {

       console.log({ e });
       alert('Upload failed, sorry :(');
     } finally {

     }
  }


  onInputChange(text) {
    this.setState({passion: text});
  }


  onCheckEnter() {
    const { passion } = this.state;
    this.props.addPassion({passion});
    this.setState({ addingItem: false });
    this.setState({ passion: ''});
  }

  onCheckClose() {
    this.setState({passion: ''});
    this.setState({ addingItem: false });
  }

  addNewPassion() {
    const hiking = "What moves you?";
      return (
        <View style={styles.addPassionStyle}>
          <PassionItemEnter
            placeholder={hiking}
            value={this.state.passion}
            onChangeText={this.onInputChange.bind(this)}
            onCheckEnter={this.onCheckEnter.bind(this)}
            onCheckClose={this.onCheckClose.bind(this)}
          ></PassionItemEnter>
        </View>
      );
  }

  renderThumbnail() {
    if (this.props.thumbnail) {
      const { uri }= this.props.thumbnail.thumbnail;
      return (
        <View style={styles.thumbnailStyle}>
          <Image
            style={{height: 300, width: width}}
            source={{uri}} />
            <TouchableOpacity
              style={{ position: 'absolute', bottom: 20, right: 20}}
              onPress={this.renderConfirm}>
              <CloseCircle color="white"/>
            </TouchableOpacity>
        </View>
      );
    } else {
      return   <PhotoUpload onPress={this.pickImage}/>;
    }
  }

  deleteThumbnail() {
    this.props.deleteThumbnail();
    this.setState({ confirm: false });
  }

  renderConfirm() {
    this.setState({ confirm: true });
  }

  setScrollEnabled(enabled) {
    this.setState({scrollEnabled: enabled});
  }

  renderDeletePassion(passion) {
    this.setState({ deletePassion: true, deletablePassion: passion });
  }

  rejectDeletePassion() {
    this.setState({ deletePassion: false, deletablePassion: {} });
  }

  deletePassionItem() {
    this.setState({ deletePassion: false, deletablePassion: {} });
    this.props.deletePassion(this.state.deletablePassion);
  }

  // onUserPress() {
  //   Actions.editProfile();
  // }

  render(){
    const { viewStyle, headerStyle, homeStyle,headerViewStyle,
    outterContainer } = styles ;

    return (
      <KeyboardAvoidingView behavior="padding" style={outterContainer}>
        <View style={headerStyle}>
          <View style={headerViewStyle}>
            <TouchableOpacity
              style={{ paddingLeft: 15 }}
               >
            </TouchableOpacity>
            <Text style={homeStyle}>Home</Text>
            <View></View>
          </View>
        </View>
        <View style={{flexShrink: 1}}>
          <ScrollView
          scrollEnabled={this.state.scrollEnabled}
          contentContainerStyle={styles.scrollStyle}
          keyboardShouldPersistTaps='handled'>
          {this.renderThumbnail()}
          <PassionsList
          setScrollViewEnabled={this.setScrollEnabled}
          renderDeletePassion={this.renderDeletePassion}/>
          {this.addNewPassion()}
        </ScrollView>
        </View>
        <Confirm
          visible={this.state.confirm}
          onAccept={this.deleteThumbnail}
           >
          Are you sure you want to delete?
        </Confirm>
        <Confirm
          visible={this.state.deletePassion}
          onAccept={this.deletePassionItem}
          onDecline={this.rejectDeletePassion}
           >
          Are you sure you want to delete this item?
        </Confirm>
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
  viewStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexShrink: 1
  },
  scrollStyle: {
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.5,
    borderTopColor: '#D0D0D0',
    borderTopWidth: 0.5,
    backgroundColor: 'white'
  },
  outterContainer:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#EBEBEE',
    display: 'flex',
    justifyContent: 'flex-start',
    flexShrink: 1
  },
  addPassionStyle:{
    backgroundColor: '#fff',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  imageGrid: {
    flex: 1,
    justifyContent: 'center'
  },
  thumbnailStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: width,
    marginTop: 10,
    marginBottom: 10
  },
  addItemStyle: {
      backgroundColor: '#fff',
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 5
  },
  contentText:{
    color:'#007aff',
    fontSize: 25,
    padding: 5,
    paddingLeft: 15
  }
};

const mapStateToProps = (state) => {
  console.log(state);
   const { thumbnail } = state.passions;
    const thumbnailReturn = _.map(thumbnail, (val, key) => {
      return val;
    });
    return { thumbnail: thumbnailReturn[0] };

};



export default connect(mapStateToProps, { addPassion,
   addThumbNail, fetchThumbnail, deleteThumbnail, deletePassion })(HomePage);

   // <View style={headerStyle}>
   //   <View style={headerViewStyle}>
   //     <TouchableOpacity style={{ paddingLeft: 15 }} >
   //       <User />
   //     </TouchableOpacity>
   //     <Text style={homeStyle}>Home</Text>
   //     <TouchableOpacity
   //     style={{ paddingRight: 15, paddingBottom: 10}}
   //     onPress={this.onButtonPress}>
   //       <PlusButtonSkinny size={30}/>
   //     </TouchableOpacity>
   //   </View>
   // </View>
