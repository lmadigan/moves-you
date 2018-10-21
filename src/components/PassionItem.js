import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions,
  PanResponder, Animated  } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { deletePassion } from '../actions';

class PassionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passion: this.props.passion,
      onItemPress: this.props.onItemPress,
      pan: new Animated.ValueXY(),
      confirm: false
    };
    this.onPress = this.onPress.bind(this);
    this.deletePassion = this.deletePassion.bind(this);
    this.setScrollViewEnabled = this.setScrollViewEnabled.bind(this);
  }

  componentWillMount() {

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if ( gestureState.dx < -1  ) {
          return true;
        } else {
          return false;
        }
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: (e, gestureState) => {
        this.setScrollViewEnabled(false);
        if (gestureState.dx > -100) {
          let newX = gestureState.dx;
          this.state.pan.setValue({x: newX, y: 0});
        }
      }
      // Animated.event([
      //   null, {dx: this.state.pan.x, dy: this.state.pan.y},
      // ]),
      ,

      onPanResponderRelease: (e, gestureState) => {
        if ( gestureState.dx >  -150  ) {
          Animated.timing(this.state.pan, {
           toValue: { x: 0, y: 0 },
           duration: 150
          }).start();
        } if ( gestureState.dx <= -150 ) {
          this.deletePassion();
          Animated.timing(this.state.pan, {
           toValue: { x: 0, y: 0 },
           duration: 100
          }).start();
        }
      this.setScrollViewEnabled(true);
      }
    });
  }

    onPress() {
      this.state.onItemPress(this.state.passion);
    }

    deletePassion() {
      this.props.renderDeletePassion(this.state.passion);
    }

    setScrollViewEnabled(enabled) {
      this.props.setScrollViewEnabled(enabled);
    }


    render() {
      const { cardsectionStyle, textStyle } = styles;

      let { passions } = this.props;
      let passionList = [];
      const onPress = this.onPress;


      let { pan } = this.state;
       // Calculate the x and y transform from the pan value
       let [translateX, translateY] = [pan.x, pan.y];
       // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
       let imageStyle = {transform: [{translateX}]};

       let style = { ...imageStyle , ...styles.panStyle};

      return (
        <Animated.View style={style} {...this._panResponder.panHandlers}>
          <TouchableOpacity onPress={() => this.onPress()}>
            <View style={styles.cardsectionStyle}>
                <Text style={styles.textStyle}>
                  {this.props.passion.name}
                </Text>
            </View>
            </TouchableOpacity>
          <View style={styles.deleteStyle}>
            <Text style={styles.deleteText}>Delete</Text>
          </View>
        </Animated.View>

      );
    }

}
const width = Dimensions.get("window").width;

const styles = {
  cardsectionStyle: {
    width: width,
    backgroundColor: 'white',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.5,
  },
  middleConainter:{
    display: 'flex',

  },
  textStyle: {
    padding: 10,
    color: '#4c5267',
    fontSize: 25
  },
   deleteStyle:{
     height: 60,
     justifyContent: 'center',
     alignSelf: 'center',
     alignItems: 'center',
     backgroundColor: 'red',
     width: 100,
     right: 0
   },
   panStyle: {
     flexDirection: 'row',
     height: 60,
     marginRight: -100,
     justifyContent: 'center'
   },
   deleteText: {
     color: 'white',
     fontSize: 14
   }
  };

export default connect(null, { deletePassion })(PassionItem);
