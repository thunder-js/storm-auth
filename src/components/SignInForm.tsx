import React from 'react'
import styled from 'styled-components/native'
import { View, Image, Alert } from 'react-native'
import {TextInput} from '../common/TextInput'
import {PasswordInput} from './PasswordInput'
import {Button} from '../common/Button'
import { ISignInFacebook } from '../hocs/graphcool/sign-in-facebook'
import { ISignInEmail } from '../hocs/graphcool/sign-in-email'

const emailImage = require('../resources/assets/icon-email.png')
const facebookImage = require('../resources/assets/icon-facebook.png')

const Wrapper = styled(View)`
  flex: 1;
`

const StyledTextInput = styled(TextInput)`
  margin-bottom: 20px
`
// const StyledPasswordInput = styled(PasswordInput)`
//   margin-bottom: ${32}px;
// `

const EmailLoginButton = styled(Button)`
  margin-bottom: ${18}px
`
const FacebookLoginButton = styled(Button)`

`

export interface ISignInFormProps {
  signInWithEmail?: (email: string, password: string) => Promise<any>,
  signInWithFacebook?: () => Promise<any>,
  loadingEmail?: boolean,
  loadingFacebook?: boolean
}

export interface ISignInFormState {
  email: string,
  password: string
}
export class SignInForm extends React.Component<ISignInEmail & ISignInFacebook, ISignInFormState> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChangeEmail = (email: string) => {
    this.setState({
      email
    })
  }
  handleChangePassword = (password: string) => {
    this.setState({
      password
    })
  }

  handleEmailLoginPress = () => {
    const { signInWithEmail } = this.props
    const { email, password } = this.state
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
    } else {
      signInWithEmail(email, password)
    }
  }
  handleFacebookLoginPress = () => {
    const { signInWithFacebook } = this.props
    signInWithFacebook()
  }

  render() {
    const {
      email,
      password
    } = this.state
    const {
      loadingEmail,
      loadingFacebook
    } = this.props
    const loading = loadingEmail || loadingFacebook

    return (
      <Wrapper>
        <StyledTextInput
          onChangeText={this.handleChangeEmail}
          leftIcon={<Image source={emailImage} />}
          placeholder='E-mail'
          autoCapitalize='none'
          value={email}
        />
        <PasswordInput
          style={{marginBottom: 32}}
          onChangeText={this.handleChangePassword}
          value={password}
        />
        <EmailLoginButton
          title='Entrar'
          loading={loadingEmail}
          disabled={loading}
          onPress={this.handleEmailLoginPress}
        />
        <FacebookLoginButton
          title='Entrar com Facebook'
          imageSource={facebookImage}
          disabled={loading}
          loading={loadingFacebook}
          onPress={this.handleFacebookLoginPress}
        />

      </Wrapper>
    )
  }
}
