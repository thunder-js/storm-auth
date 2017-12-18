import React from 'react'
import { View, Image, Alert, ViewStyle, StyleSheet } from 'react-native'
import {TextInput} from '../common/TextInput'
import {PasswordInput} from './PasswordInput'
import {Button} from '../common/Button'
import { ImageSource, ISignUpProps } from '../types'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  } as ViewStyle,
  textInput: {
    marginBottom: 20,
  } as ViewStyle,
})

export interface ISignUpFormProps {
  assets: {
    userImage: ImageSource,
    emailImage: ImageSource,
    passwordImage: ImageSource,
    eyeOnImage: ImageSource,
    eyeOffImage: ImageSource,
  }
}

export interface ISignUpFormState {
  name: string,
  email: string,
  password: string
}

export class SignUpForm extends React.Component<ISignUpFormProps & ISignUpProps, ISignUpFormState> {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }
  public handleChangeName = (name: string) => this.setState({
    name,
  })

  public handleChangeEmail = (email: string) => this.setState({
    email,
  })

  public handleChangePassword = (password: string) => this.setState({
    password,
  })

  public handleSignUpPress = () => {
    const {
      signUp,
    } = this.props
    const {
      name,
      email,
      password,
    } = this.state
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
    } else {
      signUp(name, email, password)
    }
  }
  public render() {
    const {
      name,
      email,
      password,
    } = this.state
    const {
      loading,
      assets,
    } = this.props

    return (
      <View style={styles.wrapper}>
        <TextInput
          style={styles.textInput}
          leftIcon={<Image source={assets.userImage} />}
          placeholder={'Nome'}
          value={name}
          onChangeText={this.handleChangeName}
        />
        <TextInput
          style={styles.textInput}
          leftIcon={<Image source={assets.emailImage} />}
          autoCapitalize='none'
          placeholder='E-mail'
          value={email}
          onChangeText={this.handleChangeEmail}
        />
        <PasswordInput
          style={{marginBottom: 30}}
          value={password}
          onChangeText={this.handleChangePassword}
          passwordImage={assets.passwordImage}
          eyeOnImage={assets.eyeOnImage}
          eyeOffImage={assets.eyeOffImage}
        />
        <Button
          title='Cadastrar'
          loading={loading}
          disabled={loading}
          onPress={this.handleSignUpPress}
        />
      </View>
    )
  }
}
