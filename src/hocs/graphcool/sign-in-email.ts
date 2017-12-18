import { graphql, withApollo } from 'react-apollo'
import { withState, compose, ComponentEnhancer } from 'recompose'
import { authenticateUserMutation } from './mutations'
import { ApolloClient } from 'apollo-client'
import { ISignInEmailProps } from '../../types';

export interface IAuthenticateUser {
  token: string
}
export interface ISignInResponse {
  authenticateUser: IAuthenticateUser,
}

export interface IWithSignInEmailProps {
  onSuccessEmail: (authenticateUser: ISignInResponse) => void
  onErrorEmail: (error: any) => void
}

export interface IGraphQLInputProps extends IWithSignInEmailProps {
  setLoadingEmail: (loading: boolean) => void,
  client: ApolloClient<any>,
}

export const withSignInEmail = <P>() => compose<ISignInEmailProps & P, IWithSignInEmailProps & P>(
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
  graphql<ISignInResponse, IGraphQLInputProps, ISignInEmailProps>(authenticateUserMutation, {
    props: ({ ownProps: { setLoadingEmail, client, onSuccessEmail, onErrorEmail }, mutate }) => ({
      signInEmail: async (email: number, password: number) => {
        setLoadingEmail(true)
        try {
          /**
           * Sign in with given email and password
           */
          const authenticateUserResponse = await mutate({
            variables: {
              email,
              password,
            },
          })

          /**
           * Write obtained token to local STORAGE
           */
          const token = authenticateUserResponse.data.authenticateUser.token
          if (token) {
            client.resetStore()
            onSuccessEmail(authenticateUserResponse.data)
          } else {
            throw new Error('Nenhum token na resposta')
          }
        } catch (err) {
          onErrorEmail(err)
        } finally {
          setLoadingEmail(false)
        }
      },
    }),
  }),
)
