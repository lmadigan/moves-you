import { Text, StyleSheet } from 'react-native' ;
import React, { Component } from 'react' ;
import { Font } from 'expo';
import { connect } from 'react-redux' ;

class PeachSundress extends Component {
  constructor(){
    super()
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'peach-sundress': require('../../../assets/fonts/peach-sundress.ttf')
    });
    this.setState({ fontLoaded: true });
  }


  Loadtext(){
    const styles = StyleSheet.create({fontStyle: {
      fontFamily: 'peach-sundress'
      }});

      if(this.state.fontLoaded){
        return (<Text style={[styles.fontStyle, this.props.style]}>{this.props.children}</Text>) ;
      } else {
        return (<Text></Text>);
      }
    }


  render(){
    console.log(this.props);
      return (
        this.Loadtext()
      );
    }
}


export default PeachSundress ;
