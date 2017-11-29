import { AsyncStorage, Alert } from 'react-native'
import { graphql, withApollo } from 'react-apollo'
import { withState, compose, ComponentEnhancer } from 'recompose'
import { authenticateUserMutation } from './mutations'
import { ApolloClient } from 'apollo-client'

export type AuthenticateUser = {
  token: string
}
export type Response = {
  authenticateUser: AuthenticateUser
}

export interface IWithSignInProps {
  onSuccessEmail: (authenticateUser: Response) => void
}
export interface IGraphQLInputProps extends IWithSignInProps {
  setLoadingEmail: (loading: boolean) => void,
  client: ApolloClient<any>,
}

export interface ISignInEmail {
  signInWithEmail: (email: string, password: string) => Promise<any>
}

export const withSignInEmail = <Props>(): ComponentEnhancer<Props & ISignInEmail, IWithSignInProps> =>
  compose<ISignInEmail, IWithSignInProps>(
  /**
   * Get access to client object to call client.resetStore
   */
  withApollo,
  /**
   * State
   */
  withState('loadingEmail', 'setLoadingEmail', false),
  /**
   * E-mail Authentication
   */
  graphql<Response, IGraphQLInputProps, ISignInEmail>(authenticateUserMutation, {
    props: ({ ownProps: { setLoadingEmail, client, onSuccessEmail }, mutate }) => ({
      signInWithEmail: async (email: number, password: number) => {
        setLoadingEmail(true)
        alert('start')
        try {
          /**
           * Sign in with given email and password
           */
          const authenticateUserResponse = await mutate({
            variables: {
              email,
              password
            }
          })
          alert('response')
          /**
           * Write obtained token to local STORAGE
           */
          const token = authenticateUserResponse.data.authenticateUser.token
          if (token) {
            alert('has token')
            await AsyncStorage.setItem('token', token)
            client.resetStore()
            onSuccessEmail(authenticateUserResponse.data)
          } else {
            throw new Error('Nenhum token na resposta')
          }
        } catch (err) {
          Alert.alert(err.toString()) //  TODO
        } finally {
          alert('finally')
          setLoadingEmail(false)
        }
      }
    })
  })
)