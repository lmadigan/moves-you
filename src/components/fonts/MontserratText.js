import { Text, StyleSheet } from 'react-native' ;
import React, { Component } from 'react' ;
import { Font } from 'expo';
import { connect } from 'react-redux' ;

class MontserratText extends Component {
  constructor(){
    super()
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'montserrat_regular': require('../../../assets/fonts/montserrat_regular.otf')
    });
    this.setState({ fontLoaded: true });
  }

  Loadtext(){
    const styles = StyleSheet.create({fontStyle: {
      fontFamily: 'montserrat_regular'
      }});

      if(this.state.fontLoaded){
        return (<Text style={[styles.fontStyle, this.props.style]}>{this.props.children}</Text>) ;
      } else {
        return (<Text></Text>);
      }
    }

  render(){
      return (
        this.Loadtext()
      );
    }
}

export default MontserratText;
