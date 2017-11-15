import React from 'react';
import { View, ScrollView, Image, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { func } from 'prop-types'

const authBackground = require('../../assets/auth-background.png');
const authLogo = require('../../assets/auth-logo.png');
const closeImageSource = require('../../assets/icon-close.png');

const Separator = styled(View)`
  height: 1px;
  background-color: #FFFFFF;
`

const { width } = Dimensions.get('window');

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 30px;
  right: 20px;
`;

const CloseImage = styled(Image)`
  width: 24px;
  height: 24px;
  tint-color: #FFF;
`;

const FormContainer = styled(ScrollView)`
  width: ${width};
  flex: 1;
`;

const FormWrapper = styled(View)`
  width: ${width};
  padding-horizontal: 45px;
  align-items: stretch;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  background-color: red;
`;

const LogoWrapper = styled(View) `
  margin-top: 46px;
  margin-bottom: 46px;
  align-items: center;
`;

const Logo = styled(Image)`
  width: 168px;
  height: 168px;
`;

const FooterWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  align-self: center;
  position: absolute;
  bottom: 0;
`;

const SignInCall = styled(Text)`
  font-weight: 700;
  margin-left: 4px;
`;

const FormSeparator = styled(Separator)`
  align-self: center;
  width: 124px;
  margin-top: 42px
  margin-bottom: 42px;
`;

const ButtonText = styled(TouchableOpacity)`
  padding-vertical: 8px;
`

class Auth extends React.Component {
  static propTypes = {
    onClose: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleGoToSignUp = this.handleGoToSignUp.bind(this);
    this.handleGoToSignIn = this.handleGoToSignIn.bind(this);
  }
  handleGoToSignUp() {
    this.scrollView.scrollTo({ x: width, y: 0, animated: true });
  }
  handleGoToSignIn() {
    this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
  }
  render() {
    return (
      // <Wrapper>
      <BackgroundImage source={authBackground} resizeMode="cover">
        <KeyboardAwareScrollView extraScrollHeight={80}>
          <LogoWrapper>
            <Logo source={authLogo} resizeMode="contain" />
          </LogoWrapper>
          <CloseButton
            onPress={this.props.onClose}
          >
            <CloseImage source={closeImageSource} resizeMode="contain" />
          </CloseButton>
          <FormContainer
            innerRef={ref => this.scrollView = ref}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <FormWrapper>
              <SignIn />
              <FormSeparator light />
              <FooterWrapper>
                <Text light>Não tem uma conta?</Text>
                <ButtonText onPress={this.handleGoToSignUp}>
                  <SignInCall light>Cadastre-se aqui</SignInCall>
                </ButtonText>
              </FooterWrapper>

            </FormWrapper>
            <FormWrapper>
              <SignUp />

              <FormSeparator light />
              <FooterWrapper>
                <Text light>Já tem uma conta?</Text>
                <ButtonText onPress={this.handleGoToSignIn}>
                  <SignInCall light>Entre aqui</SignInCall>
                </ButtonText>
              </FooterWrapper>
            </FormWrapper>
          </FormContainer>
        </KeyboardAwareScrollView>
      </BackgroundImage>
    );
  }
}


export default Auth
