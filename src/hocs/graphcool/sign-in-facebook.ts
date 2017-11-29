import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { AsyncStorage, Alert } from 'react-native'
import { graphql, withApollo } from 'react-apollo'
import { withState, compose } from 'recompose'
import { facebookAuthenticateUserMutation } from './mutations'
import { ApolloClient } from 'apollo-client'

export type FacebookAuthenticateUser = {
  token: string
}
export type Response = {
  facebookAuthenticateUser: FacebookAuthenticateUser
}

export interface GraphQLHocProps {
  setLoadingFacebook: (loading: boolean) => void,
  onSuccessFacebook: (authenticateUser: Response) => void
  client: ApolloClient<any>,
}

export default (permissions = ['public_profile', 'email']) => compose(
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
  graphql<Response, GraphQLHocProps>(facebookAuthenticateUserMutation, ({
    props: ({ ownProps: { client, setLoadingFacebook, onSuccessFacebook }, mutate }) => ({
      signInWithFacebook: async () => {
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
