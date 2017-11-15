import React from 'react';
import { func, bool } from 'prop-types';
import TextInput from '@common/components/TextInput';
import styled from 'styled-components/native';
import { View, Image, Alert } from 'react-native';
import PasswordInput from '@common/components/PasswordInput';
import AuthButton from '@common/components/AuthButton';

const userImage = require('@resources/assets/icon-user.png');
const emailImage = require('@resources/assets/icon-email.png');


const Wrapper = styled(View)`
  flex: 1;
`;
const StyledTextInput = styled(TextInput)`
  margin-bottom: 20px
`;
const StyledPasswordInput = styled(PasswordInput)`
  margin-bottom: 30px;
`;
const LoginWithPasswordButton = styled(AuthButton)`
`;

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }
  handleChangeName = name => this.setState({
    name,
  })

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

  handleSignUpPress = () => {
    const {
      onSignUp,
    } = this.props;
    const {
      name,
      email,
      password,
    } = this.state;
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
    } else {
      onSignUp(name, email, password);
    }
  }
  render() {
    const {
      name,
      email,
      password,
    } = this.state;
    const {
      loading,
    } = this.props;

    return (
      <Wrapper>
        {/* <KeyboardAvoidingView> */}
        <StyledTextInput
          leftIcon={<Image source={userImage} />}
          placeholder="Nome completo"
          value={name}
          onChangeText={this.handleChangeName}
        />
        <StyledTextInput
          leftIcon={<Image source={emailImage} />}
          autoCapitalize="none"
          placeholder="E-mail"
          value={email}
          onChangeText={this.handleChangeEmail}
        />
        <StyledPasswordInput
          value={password}
          onChangeText={this.handleChangePassword}
        />
        <LoginWithPasswordButton
          title="Cadastrar"
          loading={loading}
          disabled={loading}
          onPress={this.handleSignUpPress}
        />
        {/* </KeyboardAvoidingView> */}
      </Wrapper>
    );
  }
}

SignUpForm.propTypes = {
  onSignUp: func.isRequired,
  loading: bool.isRequired,
};
export default SignUpForm;
