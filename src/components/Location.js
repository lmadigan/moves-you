import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { MapView } from 'expo';


const Location = (props) => {
  return(
    <MapView
        style={{height: 250}}
        provider="google"
        region={{
              latitude: props.location.address.location.lat,
              longitude: props.location.address.location.lng,
              latitudeDelta: 0.0622,
              longitudeDelta: 0.0221
        }}>
        <MapView.Marker
          coordinate={{
            latitude: props.location.address.location.lat,
            longitude: props.location.address.location.lng}}
          title={props.location.name}
          description={props.location.secondary}
        />
        </MapView>
  );
};

export default Location;
