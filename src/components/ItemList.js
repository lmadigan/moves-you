import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, ScrollView } from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { fetchPassions, setPassion } from '../actions';
import PassionItem from './PassionItem';

class PassionsList extends Component {
  constructor(props) {
    super(props);
    this.state = { passion: {}};
    this.onPress = this.onPress.bind(this);
    this.renderPassionItems = this.renderPassionItems.bind(this);
  }

  componentWillMount() {
    // this.props.fetchPassions();
  }

  onPress(passion) {
    
  }

  renderPassionItems() {
    let { passions } = this.props;
    let passionList = [];
    const onPress = this.onPress;

    passions.map(item => {
      passionList.push(<PassionItem passion={item} onItemPress={onPress}/>)
    });
    return passionList;
  }

  render() {
    const onPress = this.onPress;

    return (
      <ScrollView
      contentContainerStyle={{
        flexShrink: 1 }}>
      {this.renderPassionItems()}
      </ScrollView>
    );
  }
}


const mapStateToProps = (state) => {
  const { passionItems } = state.passions;
  const passions = _.map(passionItems, (val, uid) => {
    return { ...val, uid };
  });
  return { passions };
};


export default connect(mapStateToProps, { fetchPassions, setPassion })(PassionsList);
