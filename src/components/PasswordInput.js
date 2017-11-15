import React from 'react';
import TextInput from '../common/TextInput'
import { Image } from 'react-native';

const lockImage = require('../resources/icon-lock.png');
const eyeImage = require('../resources/icon-eye.png');
const eyeOffImage = require('../resources/icon-eye-off.png');

export default class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
    };
    this.toggleSecureTextEntry = this.toggleSecureTextEntry.bind(this);
  }
  toggleSecureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  }
  render() {
    return (
      <TextInput
        leftIcon={<Image source={lockImage} />}
        rightIcon={this.state.secureTextEntry ? <Image source={eyeImage} /> : <Image source={eyeOffImage} />}
        placeholder="Senha"
        autoCapitalize="none"
        secureTextEntry={this.state.secureTextEntry}
        onPressRightIcon={this.toggleSecureTextEntry}
        {...this.props}
      />
    );
  }
}
