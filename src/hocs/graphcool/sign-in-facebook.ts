import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { AsyncStorage, Alert } from 'react-native'
import { graphql, withApollo } from 'react-apollo'
import { withState, compose, ComponentEnhancer } from 'recompose'
import { facebookAuthenticateUserMutation } from './mutations'
import { ApolloClient } from 'apollo-client'
import { ISignInFacebookProps } from '../../types';

const DEFAULT_PERMISSIONS = ['public_profile', 'email']

export interface IFacebookAuthenticateUser {
  token: string
}
export interface IResponse {
  facebookAuthenticateUser: IFacebookAuthenticateUser,
}

export interface IWithSignInFacebookProps {
  onSuccessFacebook: (authenticateUser: IResponse) => void
  onErrorFacebook: (error: any) => void
}
export interface ISignInFacebookGraphQLProps extends IWithSignInFacebookProps {
  setLoadingFacebook: (loading: boolean) => void,
  client: ApolloClient<any>,
}

export const withSignInFacebook =
  <P>(permissions = DEFAULT_PERMISSIONS) => compose<ISignInFacebookProps & P, IWithSignInFacebookProps & P>(
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
  graphql<IResponse, ISignInFacebookGraphQLProps, ISignInFacebookProps>(facebookAuthenticateUserMutation, ({
    props: ({ ownProps: { client, setLoadingFacebook, onSuccessFacebook, onErrorFacebook }, mutate }) => ({
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
              facebookToken,
            },
          })

          const token = facebookAuthenticateUserResponse.data.facebookAuthenticateUser.token
          if (token) {
            client.resetStore()
            onSuccessFacebook(facebookAuthenticateUserResponse.data)
          } else {
            throw new Error('Nenhum token na resposta')
          }
        } catch (err) {
          onErrorFacebook(err)
        } finally {
          setLoadingFacebook(false)
        }
      },
    }),
  })),
)
