import React, { Component } from 'react';
import { Text, View,
  TextInput, FlatList,
  TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import Qs from 'qs';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      predictions: [],
      location: {
        name: '',
        secondary: ''
      },
      mapViewLat: 40.76727216,
      mapViewLong:  -73.99392888,
      markerLat: null,
      markerLng: null

    };
    this.onChangeText = this.onChangeText.bind(this);
    this.GooglePlacesAutocomplete = this.GooglePlacesAutocomplete.bind(this);
    this.renderPredictions = this.renderPredictions.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.setPredictions = this.setPredictions.bind(this);
    this.choosePlace = this.choosePlace.bind(this);
    this.reverseGeocode = this.reverseGeocode.bind(this);
    this.setMap = this.setMap.bind(this);
    this.renderMapMarker = this.renderMapMarker.bind(this);
  }

  setPredictions(results) {
    this.setState({
      predictions: results
    });
  }

  onChangeText(text) {
    this.setState({
      textInput: text
    });

    if (text.length < 2) {
      return;
    }

    this.GooglePlacesAutocomplete(text);
  }

  reverseGeocode(placeId) {
    const setMap = this.setMap;

    const httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = function() {
      if (httpReq.readyState !== 4) {
          return;
      }

      if (this.readyState === 4 && this.status === 200) {
         // Typical action to be performed when the document is ready:
         const responseJSON = JSON.parse(httpReq.responseText);
         if (typeof responseJSON.result !== 'undefined'){
            const result = responseJSON.result;
            setMap(result);
          } else {
         console.log(responseJSON.error_message);
       }
    }
  };

    httpReq.open('GET', 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify({
            placeid: placeId,
            key: 'AIzaSyDN6MBMMQBCJoXgbYSqxvVJ1M0wR9c3KsM',
            fields: 'geometry'
          }));

    httpReq.send();
  }

  GooglePlacesAutocomplete(text) {
    const request = new XMLHttpRequest();
    const setPredictions = this.setPredictions;

    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
          return;
      }

      if (this.readyState === 4 && this.status === 200) {
         // Typical action to be performed when the document is ready:
         const responseJSON = JSON.parse(request.responseText);

         if (typeof responseJSON.predictions !== 'undefined'){
            const results = responseJSON.predictions;
            setPredictions(results);
          } else {
         console.log(responseJSON.error_message);
       }
    }
  };



  request.open('GET', 'https://maps.googleapis.com/maps/api/place/autocomplete/json?' + Qs.stringify({
          key: 'AIzaSyDN6MBMMQBCJoXgbYSqxvVJ1M0wR9c3KsM',
          input: text,
          libraries: "places"
        }));

    request.send();
  }

  renderRow(item){
    return(
        <TouchableOpacity style={styles.row}
          onPress={() => this.choosePlace(item)}>
          <Text style={styles.textStyle}>
          {item.description}
          </Text>
        </TouchableOpacity>
    );
  }

  // keyExtractor = (item, index) => item.id;

  renderPredictions() {
    return(
      <List containerStyle={styles.listStyle}>
      <FlatList
         data={this.state.predictions}
         renderItem={({ item }) => this.renderRow(item)}
         {...this.props}
         keyExtractor={(item, index) => index.toString()}
      />
      </List>
    );
  }



  async choosePlace(place) {
    this.setState({
      location: {
        name: place.structured_formatting.main_text,
        secondary: place.structured_formatting.secondary_text
      },
      predictions: [],
      textInput: place.description
    });

    await this.reverseGeocode(place.place_id);
  }

  setMap(result){

    const lat = result.geometry.location.lat;
    const lng = result.geometry.location.lng;
    const name = this.state.location.name;
    const secondary = this.state.location.secondary;

    this.setState({
      mapViewLat: lat,
      mapViewLong: lng,
      markerLat: lat,
      markerLng: lng
    });

    this.props.onSelectLocation({
      name: name,
      secondary: secondary,
      address: result.geometry
    });

  }

  renderMapMarker() {
    if ( this.state.markerLat === null ) {
      return ;
    }

    return(
      <MapView.Marker
        coordinate={{
          latitude: this.state.markerLat,
          longitude: this.state.markerLng}}
        title={this.state.location.name}
        description={this.state.location.secondary}
      />
    );
  }

  render() {

    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
      <TextInput
        onChangeText={this.onChangeText}
        style={styles.textInput}
        placeholder="Search Location..."
        placeholderTextColor="#C0C0C0"
        value={this.state.textInput}
        />
      {this.renderPredictions()}
      <MapView
          style={{height: 250}}
          provider="google"
          region={{
                latitude: this.state.mapViewLat,
                longitude: this.state.mapViewLong,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0221
          }}>
          {this.renderMapMarker()}
         </MapView>
      </View>
    );
  }
}

const styles = {
  textInput: {
    paddingRight: 15,
    paddingLeft: 15,
    height: 40,
    width: 300,
    color: '#4c5267',
    fontSize: 20
  },
  textStyle: {
    height: 24,
    margin: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: '#808080'
  },
  row: {
    height: 33,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DCDCDC'
  },
  listStyle: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    top: 10
  }
};

export default AddLocation;
