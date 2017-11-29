import React from 'react'
import { Image } from 'react-native'
import {TextInput, ITextInputProps} from '../common/TextInput'

const lockImage = require('../resources/assets/icon-lock.png')
const eyeImage = require('../resources/assets/icon-eye.png')
const eyeOffImage = require('../resources/assets/icon-eye-off.png')

export interface IPasswordInputProps {
  onChangeText: (text: string) => void
  value: string
}
export interface IPasswordInputState {
  secureTextEntry: boolean
}

export class PasswordInput extends React.Component<IPasswordInputProps & ITextInputProps, IPasswordInputState> {
  constructor(props) {
    super(props)
    this.state = {
      secureTextEntry: true
    }
    this.toggleSecureTextEntry = this.toggleSecureTextEntry.bind(this)
  }
  toggleSecureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }
  render() {
    return (
      <TextInput
        leftIcon={<Image source={lockImage} />}
        rightIcon={this.state.secureTextEntry ? <Image source={eyeImage} /> : <Image source={eyeOffImage} />}
        placeholder='Senha'
        autoCapitalize='none'
        secureTextEntry={this.state.secureTextEntry}
        onPressRightIcon={this.toggleSecureTextEntry}
        {...this.props}
      />
    )
  }
}
