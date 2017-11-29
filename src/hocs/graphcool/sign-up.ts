import { graphql } from 'react-apollo'
import { withState, compose, ComponentEnhancer } from 'recompose'
import { AsyncStorage, Alert } from 'react-native'
import { signupUserMutation } from './mutations'

export type SignUpUser = {
  token: string
}
export type Response = {
  signupUser: SignUpUser
}

export interface IInputProps {
  setLoading: (loading: boolean) => void,
  onSuccess: (signupUser: Response) => void
}

export interface IProps {
  signUp: (name: string, email: string, password: string) => Promise<any>
}
export default (): ComponentEnhancer<IProps, {}> => compose(
  withState('loading', 'setLoading', false),
  graphql<Response, IInputProps, IProps>(signupUserMutation, {
  props: ({ ownProps: { setLoading, onSuccess }, mutate }) => ({
    signUp: async (name, email, password) => {
      setLoading(true)
      try {
        /*
				 * Sign up with given email and password
				 */
        const signupResponse = await mutate({
          variables: {
            name,
            email,
            password
          }
        })
        setLoading(false)
        /*
         * Write obtained token to local STORAGE
         */
        const token = signupResponse.data.signupUser.token
        if (token) {
          await AsyncStorage.setItem('token', token)
          // client.resetStore()
          onSuccess(signupResponse.data)
        } else {
          throw new Error('No token on response')
        }
      } catch (err) {
        Alert.alert(err.toString()) // TODO
      } finally {
        setLoading(false)
      }
    }
  })
})
)
