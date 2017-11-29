import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { AsyncStorage, Alert } from 'react-native'
import { graphql, withApollo } from 'react-apollo'
import { withState, compose, ComponentEnhancer } from 'recompose'
import { facebookAuthenticateUserMutation } from './mutations'
import { ApolloClient } from 'apollo-client'

export type FacebookAuthenticateUser = {
  token: string
}
export type Response = {
  facebookAuthenticateUser: FacebookAuthenticateUser
}

export interface ISignInFacebookProps {
  onSuccessFacebook: (authenticateUser: Response) => void
}
export interface ISignInFacebookGraphQLProps extends ISignInFacebookProps {
  setLoadingFacebook: (loading: boolean) => void,
  client: ApolloClient<any>,
}

export interface ISignInFacebook {
  signInFacebook: () => Promise<any>
}

export const withSignInFacebook =
  (permissions = ['public_profile', 'email']): ComponentEnhancer<ISignInFacebook, ISignInFacebookProps> =>
  compose(
  /**
   * Get access to client object to call client.resetStore
   */
  withApollo,
  /**
   * State
   */
  withState('loadingFacebook', 'setLoadingFacebook', false),
  /**
   * Facebook Authentication
   */
  graphql<Response, ISignInFacebookGraphQLProps, ISignInFacebook>(facebookAuthenticateUserMutation, ({
    props: ({ ownProps: { client, setLoadingFacebook, onSuccessFacebook }, mutate }) => ({
      signInFacebook: async () => {
        try {
          setLoadingFacebook(true)
          const result = await LoginManager.logInWithReadPermissions(permissions)
          if (result.isCancelled) {
            setLoadingFacebook(false)
            return
          }

          const accessTokenData = await AccessToken.getCurrentAccessToken()
          const facebookToken = accessTokenData.accessToken.toString()
          const facebookAuthenticateUserResponse = await mutate({
            variables: {
              facebookToken
            }
          })

          const token = facebookAuthenticateUserResponse.data.facebookAuthenticateUser.token
          if (token) {
            await AsyncStorage.setItem('token', token)
            client.resetStore()
            onSuccessFacebook(facebookAuthenticateUserResponse.data)
          } else {
            throw new Error('Nenhum token na resposta')
          }
        } catch (err) {
          Alert.alert('Erro logando com Facebook', err.toString())
        } finally {
          setLoadingFacebook(false)
        }
      }
    })
  }))
)
