import React from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components/native';
import { View, Image, Alert } from 'react-native';
import TextInput from '../common/TextInput'
import PasswordInput from './PasswordInput'
import Button from '../common/Button'

const emailImage = require('../resources/icon-email.png');
const facebookImage = require('../resources/icon-facebook.png');

const Wrapper = styled(View)`
  flex: 1;
`;

const StyledTextInput = styled(TextInput)`
  margin-bottom: 20px
`;
const StyledPasswordInput = styled(PasswordInput)`
  margin-bottom: ${32}px;
`;
const EmailLoginButton = styled(Button)`
  margin-bottom: ${18}px
`;
const FacebookLoginButton = styled(Button)`

`;
class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChangeEmail = (email) => {
    this.setState({
      email,
    });
  }
  handleChangePassword = (password) => {
    this.setState({
      password,
    });
  }

  handleEmailLoginPress = () => {
    const { onLoginWithPassword } = this.props;
    const { email, password } = this.state;
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
    } else {
      onLoginWithPassword(email, password);
    }
  }
  handleFacebookLoginPress = () => {
    const { onLoginWithFacebook } = this.props;
    onLoginWithFacebook();
  }

  render() {
    const {
      email,
      password,
    } = this.state;
    const {
			loadingEmail,
			loadingFacebook,
    } = this.props;
    const loading = loadingEmail || loadingFacebook;

    return (
      <Wrapper>
        <StyledTextInput
          onChangeText={this.handleChangeEmail}
          leftIcon={<Image source={emailImage} />}
          placeholder="E-mail"
          autoCapitalize="none"
          value={email}
        />
        <StyledPasswordInput
          onChangeText={this.handleChangePassword}
          value={password}
        />
        <EmailLoginButton
          title="Entrar"
          loading={loadingEmail}
          disabled={loading}
          onPress={this.handleEmailLoginPress}
        />
        <FacebookLoginButton
          title="Entrar com Facebook"
          imageSource={facebookImage}
          disabled={loading}
          loading={loadingFacebook}
          onPress={this.handleFacebookLoginPress}
        />

      </Wrapper>
    );
  }
}

SignInForm.propTypes = {
  onLoginWithPassword: func.isRequired,
  onLoginWithFacebook: func.isRequired,
  loadingEmail: bool.isRequired,
  loadingFacebook: bool.isRequired,
};
export default SignInForm;
