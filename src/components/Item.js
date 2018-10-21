import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { deleteItem } from '../actions';
import { Trash } from './symbols';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      passion: this.props.passion
    };
    this.setItem = this.setItem.bind(this);
    this.renderContentModal = this.renderContentModal.bind(this);
    this.constructItem = this.constructItem.bind(this);
    this.pressTrash = this.pressTrash.bind(this);
  }

  componentDidMount() {
    const item = this.constructItem();
    this.setItem(item);
  }

  componentDidUpdate(prevProps) {
    const currentPassion = this.state.passion;
  // Typical usage (don't forget to compare props):
    if (this.props.passion.items !== prevProps.passion.items) {
      const item = this.constructItem();
      this.setItem(item);
    }
  }

  constructItem() {
    let { content } = this.props.item.val;

    const cont = _.map(content, (val, uid) => {
       return {...val, uid };
    });

    let newItem = {
        val: {
          content: cont,
          title: this.props.item.val.title
          }
      };

    let current = this.props.item;

    let merged = { ...current, ...newItem };

    return merged;
  }

  setItem(item) {
    this.setState({ item: item });
  }

  renderContentModal(){
    const item = this.state.item;
    const passion = this.props.passion;
    if ( this.state.item.val.content[0] === undefined ) {

      Actions.addItem({ item: item, passion: passion});
    } else {
      Actions.itemView({ item, passion });
    }
  }

  pressTrash() {
    this.props.deleteItem(this.state);
  }

  render() {
      return(
        <View style={styles.cardsectionStyle}>
          <TouchableOpacity onPress={this.renderContentModal.bind(this)}>
            <Text style={styles.textStyle}>
             {this.state.item.val.title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trashStyle}
            onPress={this.pressTrash}>
            <Trash />
          </TouchableOpacity>
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const styles = {
  cardsectionStyle: {
    backgroundColor: 'white',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.5
  },
  textStyle: {
    padding: 10,
    color: '#4c5267',
    fontSize: 25
  },
  trashStyle: {
    position: 'absolute',
    right: 20
  }
};

export default connect( mapStateToProps, { deleteItem })(Item);
