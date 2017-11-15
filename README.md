## 🌩️ Storm Auth 🌩️

A set of react native modules to handle authentication

![Screenshot](https://raw.githubusercontent.com/thunder-js/storm-auth/master/screenshots/img1.jpeg)
![Screenshot](https://raw.githubusercontent.com/thunder-js/storm-auth/master/screenshots/img2.jpeg)

## Installation
```
yarn add storm-auth
```

## Usage
```js
import Auth from 'storm-auth/src/components/Auth'
import SignInForm from 'storm-auth/src/components/SignInForm'
import SignUpForm from 'storm-auth/src/components/SignUpForm'
import graphcoolSignInWithEmail from 'storm-auth/src/hocs/graphcool/sign-in-email'
import graphcoolSignInWithFacebook from 'storm-auth/src/hocs/graphcool/sign-in-facebook'
import graphcoolSignUp from 'storm-auth/src/hocs/graphcool/sign-up'

const SignInFormContainer = compose(
  graphcoolSignInWithEmail(),
  graphcoolSignInWithFacebook(['public_profile', 'email']),
)(SignInForm)
const SignUpFormContainer = compose(
  graphcoolSignUp()
)(SignUpForm)

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloComponent}>
        <View style={styles.container}>
          <Auth
            backgroundImageSource={{uri: 'https://unsplash.it/600x1200'}}
            logoSource={{uri: 'https://unsplash.it/400x400'}}
            signInContainer={<SignInFormContainer
              onSuccessEmail={() => alert('Success Email')}
              onSuccessFacebook={() => alert('Success Facebook')}/>
            }
            signUpContainer={<SignUpFormContainer
              onSuccess={() => alert('Success Sign Up')} />
            }
          />
        </View>
      </ApolloProvider>
    );
  }
}
```

## Props
```js

```
