import React from 'react'
import { Image } from 'react-native'
import {TextInput, ITextInputProps} from '../common/TextInput'
import { ImageSource } from './Auth'

export interface IPasswordInputProps {
  onChangeText: (text: string) => void
  value: string
  passwordImage: ImageSource
  eyeOnImage: ImageSource
  eyeOffImage: ImageSource
}
export interface IPasswordInputState {
  secureTextEntry: boolean
}

export class PasswordInput extends React.Component<IPasswordInputProps & ITextInputProps, IPasswordInputState> {
  constructor(props) {
    super(props)
    this.state = {
      secureTextEntry: true,
    }
    this.toggleSecureTextEntry = this.toggleSecureTextEntry.bind(this)
  }
  public toggleSecureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    })
  }
  public render() {
    const {
      passwordImage,
      eyeOnImage,
      eyeOffImage,
    } = this.props
    return (
      <TextInput
        leftIcon={<Image source={passwordImage} />}
        rightIcon={this.state.secureTextEntry ? <Image source={eyeOnImage} /> : <Image source={eyeOffImage} />}
        placeholder='Senha'
        autoCapitalize='none'
        secureTextEntry={this.state.secureTextEntry}
        onPressRightIcon={this.toggleSecureTextEntry}
        {...this.props}
      />
    )
  }
}
