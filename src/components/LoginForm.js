import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ImageBackground, TextInput, Dimensions,
  TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import MontserratText from './fonts/MontserratText';
import PeachSundress from './fonts/PeachSundress';
import { User, Lock } from './symbols';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      loginButtonText: 'Login',
      switchAccountsText: "Don't have an account?",
      switchAccountsLink: "Sign Up."
    };

    this.switchAccounts = this.switchAccounts.bind(this);
  }


  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderError() {
    if ( this.props.error ) {
      return(
        <View>
          <Text style={styles.errorStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  switchAccounts() {
    if (this.state.loginButtonText === 'Login') {
      this.setState({
        loginButtonText: "Sign Up",
        switchAccountsText: "Already have an account? ",
        switchAccountsLink: "Log In."
      });
    } else {
      this.setState({
        loginButtonText: 'Login',
        switchAccountsText: "Don't have an account? ",
        switchAccountsLink: "Sign Up."
      });
    }

  }


  renderButton() {
    let buttonText = this.state.loginButtonText ? this.state.loginButtonText : "";

    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <TouchableOpacity
        style={styles.loginStyle}
        onPress={this.onButtonPress.bind(this)}>
        <MontserratText style={styles.loginText}>{buttonText}</MontserratText>
      </TouchableOpacity>
    );
  }

  render() {
    console.log(this.props);
    let switchAccountsLink = this.state.switchAccountsLink ? this.state.switchAccountsLink : "";
    let switchAccountsText = this.state.switchAccountsText ? this.state.switchAccountsText : "";

    return (
      <ImageBackground
            style={styles.backgroundImage}
            source={require('../../assets/unsplash.jpg')}
          >
      <KeyboardAvoidingView behavior="padding" style={styles.outterContainer}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={styles.textContainer}>


      <View style={styles.textAreaStyle}>
      <View style={styles.movesYouContainer}>
        <PeachSundress style={styles.whatMoves}>What Moves</PeachSundress>
        <PeachSundress style={styles.youStyle}>YOU?</PeachSundress>
      </View>

      <View style={styles.inputContainerStyle}>
        <View style={styles.userSymbolStyle}>
          <User />
        </View>
        <TextInput
          placeholder={"Email"}
          autoCorrect={false}
          value={this.props.email}
          onChangeText={this.onEmailChange.bind(this)}
          style={styles.inputStyle}
          placeholderTextColor={'white'}
        />
      </View>

      <View style={styles.inputContainerStyle}>
        <View style={styles.passwordSymbolStyle}>
          <Lock />
        </View>
        <TextInput
          placeholder={"Password"}
          autoCorrect={false}
          secureTextEntry={true}
          value={this.props.password}
          onChangeText={this.onPasswordChanged.bind(this)}
          style={styles.inputStyle}
          placeholderTextColor={'white'}
        />
      </View>

      {this.renderError()}

      {this.renderButton()}

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{switchAccountsText}</Text>
        <TouchableOpacity onPress={this.switchAccounts}>
          <Text style={styles.signupLabel}>{switchAccountsLink}</Text>
        </TouchableOpacity>
      </View>
    </View>

    </ScrollView>

    </KeyboardAvoidingView>
    </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const loginWidth = width - 56;

const styles = {
  errorStyle: {
    color: 'red',
    fontSize: 20,
    alignSelf: 'center'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  movesYouContainer: {
    height: 250,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  whatMoves: {
    fontSize: 60,
    color: 'white'
  },
  youStyle:{
    fontSize: 80,
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  inputContainerStyle: {
    height: 40,
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5
  },
  inputStyle: {
    color: 'white',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
  userSymbolStyle: {
    paddingLeft: 10,
    paddingRight:20
  },
  passwordSymbolStyle: {
    paddingLeft: 15,
    paddingRight:22
  },
  loginStyle: {
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 45,
    width: loginWidth,
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 30,
    marginLeft: 30
  },
  loginText: {
    fontSize: 20,
    color: 'white'
  },
  outterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  textContainer: {
    height: '100%',
    width: '100%',
    marginBottom: 20,
    marginTop: 30
  },
  textAreaStyle: {
    height: height,
    justifyContent: 'center'
  },
  signupContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  signupText: {
      color: 'white'
  },
  signupLabel:{
    textDecorationLine: 'underline',
    fontSize: 14,
    color: '#BDC4C9'
  }
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
