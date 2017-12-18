import React from 'react'
import { View, Image, Alert, StyleSheet, ViewStyle } from 'react-native'
import { TextInput } from '../common/TextInput'
import { PasswordInput } from './PasswordInput'
import { Button } from '../common/Button'
import { ImageSource, ISignInFacebookProps, ISignInEmailProps } from '../types'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  } as ViewStyle,
  textInput: {
    marginBottom: 20,
  } as ViewStyle,
  buttonEmail: {
    marginBottom: 18,
  } as ViewStyle,
})

export interface ISignInFormProps {
  assets: {
    emailImage: ImageSource,
    passwordImage: ImageSource,
    eyeOnImage: ImageSource,
    eyeOffImage: ImageSource,
    facebookImage: ImageSource,
  }
}

export interface ISignInFormState {
  email: string,
  password: string
}

export class SignInForm extends React.Component<ISignInEmailProps & ISignInFacebookProps & ISignInFormProps, ISignInFormState> {
  private inputs = {
    password: undefined,
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  public handleChangeEmail = (email: string) => {
    this.setState({
      email,
    })
  }
  public handleChangePassword = (password: string) => {
    this.setState({
      password,
    })
  }

  public handleEmailLoginPress = () => {
    const { signInEmail } = this.props
    const { email, password } = this.state
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
    } else {
      signInEmail(email, password)
    }
  }
  public handleFacebookLoginPress = () => {
    const { signInFacebook } = this.props
    signInFacebook()
  }

  public focusNextField = (id) => {
    this.inputs[id].focus()
  }

  public render() {
    const {
      email,
      password,
    } = this.state
    const {
      loadingEmail,
      loadingFacebook,
      assets,
    } = this.props
    const loading = loadingEmail || loadingFacebook

    return (
      <View style={styles.wrapper}>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleChangeEmail}
          leftIcon={<Image source={assets.emailImage} />}
          placeholder='E-mail'
          autoCapitalize='none'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => {
            this.focusNextField('password')
          }}
          value={email}
        />
        <PasswordInput
          style={{marginBottom: 32}}
          passwordImage={assets.passwordImage}
          eyeOnImage={assets.eyeOnImage}
          eyeOffImage={assets.eyeOffImage}
          onChangeText={this.handleChangePassword}
          returnKeyType='done'
          blurOnSubmit={true}
          value={password}
          onSubmitEditing={this.handleEmailLoginPress}
          ref={(input) => this.inputs.password = input}
        />
        <Button
          style={styles.buttonEmail}
          title='Entrar'
          loading={loadingEmail}
          disabled={loading}
          onPress={this.handleEmailLoginPress}
        />
        <Button
          title='Entrar com Facebook'
          imageSource={assets.facebookImage}
          disabled={loading}
          loading={loadingFacebook}
          onPress={this.handleFacebookLoginPress}
        />
      </View>
    )
  }
}
