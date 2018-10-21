import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, TouchableOpacity,
  KeyboardAvoidingView, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { Card, CardSection, Header } from './common';
import { PlusButtonSkinny, ArrowLeft } from './symbols';
import { setPassion, addItem, fetchPassion } from '../actions';
import AddItem from './AddItemsModal';
import { PassionItemEnter } from './PassionItemEnter';
import Item from './Item';

class PassionView extends Component {
  constructor(props){
    super(props);
    this.state = {
      passion: this.props.passion,
      item: ''
    };
    this.onPlus = this.onPlus.bind(this);
    this.onBack = this.onBack.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCheckEnter = this.onCheckEnter.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.setPassion = this.setPassion.bind(this);
  }

  componentWillMount() {
    const passion = this.state;
    this.props.fetchPassion(passion);
  }

  setPassion(passion) {
    let currentPassion = this.state.passion;
    let newPassion = { ...currentPassion, ...passion};
    this.setState({ passion: newPassion });
  }

  componentDidUpdate(prevProps) {
    const currentPassion = this.state.passion;
  // Typical usage (don't forget to compare props):
    if (this.props.passions.passion.items !== prevProps.passions.passion.items) {
      this.setPassion(currentPassion);
    }
  }

  onPlus() {
    let {passion}  = this.props ;
    Actions.addItem({passion});
  }

  onBack() {
    Actions.homepage();
  }

  onInputChange(text) {
    this.setState({item: text});
  }


  onCheckEnter() {
    const state = this.state;
    this.props.addItem(state);
    this.setState({ addingItem: false });
      this.setState({item: ''});
  }

  renderItems() {

      let uid = { uid: this.props.passion.uid };

      let thisPassion = {...uid, ...this.props.passions.passion}
      const { items } = thisPassion;

      const array = _.map(items, (val, key) => {

        return { val, key };
      });
      let itemsArray = [];

      if ( items ) {
        array.forEach(item => {
          itemsArray.push(
            <Item item={item} key={item.key} passion={thisPassion}/>
          );
        });
      }

      return itemsArray;

  }

  addNewItem() {
    const hiking = "Add item here...";
      return (
        <View style={styles.addPassionStyle}>
          <PassionItemEnter
            placeholder={hiking}
            value={this.state.item}
            onChangeText={this.onInputChange.bind(this)}
            onCheckEnter={this.onCheckEnter.bind(this)}
          ></PassionItemEnter>
        </View>
      );
  }



  render() {
    const { textStyle, cardsectionStyle, buttonContainerStyle,
    viewStyle, headerStyle, headerViewStyle, homeStyle, leftStyle,
    outterContainer} = styles;
    const onBack = this.onBack;
      return (
        <KeyboardAvoidingView behavior="padding" style={outterContainer}>
          <View style={headerStyle}>
            <View style={headerViewStyle}>
              <View style={leftStyle}>
                <ArrowLeft onPress={this.onBack} />
              </View>
              <Text style={homeStyle}>{this.state.passion.name}</Text>
              <View></View>
            </View>
          </View>
          <ScrollView
            style={{ flexShrink: 1}}
            keyboardShouldPersistTaps='handled'>
            {this.renderItems()}
            {this.addNewItem()}
          </ScrollView>
        </KeyboardAvoidingView>
      );
  }
 }

 const mapStateToProps = (state) => {

   const { passions } = state;

   return { passions };
 };

export default connect(mapStateToProps, { setPassion,
  addItem, fetchPassion })(PassionView);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = {
  cardStyle:{
    height: height,
    backgroundColor: '#FEFEFE'
  },
  cardsectionStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textStyle: {
    padding: 10,
    color: '#4c5267',
    fontSize: 22
  },
  buttonContainerStyle:{
    alignItems: 'center',
    alignSelf: 'center'
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
  outterContainer:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#EBEBEE',
    display: 'flex',
    justifyContent: 'flex-start',
    flexShrink: 1
  },
  leftStyle: {
    paddingLeft: 10
  },
  addPassionStyle:{
    backgroundColor: '#fff',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  }
};
