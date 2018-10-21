import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, PanResponder,
  Animated } from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { fetchPassions, setPassion } from '../actions';
import PassionItem from './PassionItem';

class PassionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passion: {}
    };
    this.onPress = this.onPress.bind(this);
    this.renderPassionItems = this.renderPassionItems.bind(this);
  }

  componentWillMount() {
    this.props.fetchPassions();
  }

  onPress(passion) {
    this.props.setPassion(passion);
  }

  renderPassionItems() {
    let { passions } = this.props;
    console.log(passions);
    let passionList = [];
    const onPress = this.onPress;

    passions.map(item => {
      passionList.push(
            <PassionItem passion={item}
              key={item.name}
              onItemPress={this.onPress}
              setScrollViewEnabled={this.props.setScrollViewEnabled}
              renderDeletePassion={this.props.renderDeletePassion}/>
        );
    });
    return passionList;
  }

  render() {
    console.log(this.state);
    const onPress = this.onPress;



    return (
      <View>
        {this.renderPassionItems()}
      </View>
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

const styles = {
  containerStyle: {
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.5,
    borderTopColor: '#D0D0D0',
    borderTopWidth: 0.5,
    backgroundColor: 'white'
  },
  listItem: {
   height: 60,
   marginRight: -100,
   justifyContent: 'center'
 }
}


export default connect(mapStateToProps, { fetchPassions, setPassion })(PassionsList);
