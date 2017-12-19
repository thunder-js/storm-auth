import React from 'react';
import { View, Image, Alert, StyleSheet, TextStyle, ViewStyle, TouchableOpacity, Text } from 'react-native'
import {TextInput} from '../common/TextInput';
import { Button } from '../common/Button';
import { ImageSource } from '../types';

const FormSeparator = () => <View style={styles.formSeparator} />

export interface IForgotPasswordRequestFormProps {
  loadingForgotPasswordRequest: boolean;
  forgotPasswordRequest: (email: string) => Promise<any>;
  assets: {
    email: ImageSource,
  },
  onPressSignIn: () => void
}

export interface IForgotPasswordRequestFormState {
  email: string;
}

class ForgotPasswordRequestForm extends React.Component<IForgotPasswordRequestFormProps, IForgotPasswordRequestFormState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  public handleChangeEmail = (email) => {
    this.setState({
      email,
    });
  }

  public handleSubmitPress = () => {
    const { forgotPasswordRequest } = this.props;
    const { email } = this.state;
    if (!email) {
      Alert.alert('Erro', 'Preencha o campo de e-mail');
    } else {
      forgotPasswordRequest(email);
    }
  }

  public render() {
    const { email } = this.state;
    const { loadingForgotPasswordRequest, assets, onPressSignIn } = this.props;

    return (
      <View style={styles.wrapper}>
        <TextInput
          onChangeText={this.handleChangeEmail}
          leftIcon={<Image source={assets.email} />}
          placeholder='E-mail'
          autoCapitalize='none'
          value={email}
          style={styles.textInput}
        />
        <Button
          title='Recuperar senha'
          loading={loadingForgotPasswordRequest}
          disabled={loadingForgotPasswordRequest}
          onPress={this.handleSubmitPress}
          style={styles.submitButton}
        />
        <FormSeparator />
        <View style={styles.footerWrapper}>
          <Text style={styles.signInCallPrefix}>Já tem uma conta?</Text>
          <TouchableOpacity style={styles.buttonText} onPress={onPressSignIn}>
            <Text style={styles.signInCall}>Entre aqui</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  } as ViewStyle,
  textInput: {
    marginBottom: 20,
  } as TextStyle,
  submitButton: {
    marginBottom: 18,
  } as ViewStyle,
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  signInCallPrefix: {
    color: '#FFF',
  } as TextStyle,
  signInCall: {
    fontWeight: '700',
    marginLeft: 4,
    color: '#FFF',
  } as TextStyle,
  formSeparator: {
    height: 1,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    width: 124,
    marginVertical: 42,
  } as ViewStyle,
  buttonText: {
    paddingVertical: 8,
  } as TextStyle,
})

export default ForgotPasswordRequestForm;
