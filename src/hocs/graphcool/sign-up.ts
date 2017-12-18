import { graphql } from 'react-apollo'
import { signupUserMutation } from './mutations'
import { ISignUpProps } from '../../types'
import { ComponentDecorator } from 'react-apollo/types';

export interface ISignUpUser {
  token: string
}
export interface ISignUpResponse {
  signupUser: ISignUpUser,
}

export interface IWithSignUpProps {
  onSuccess: (signUpUser: ISignUpUser) => void,
  onError: (error: any) => void,
}

export const withSignUp = <P>(): ComponentDecorator<P & IWithSignUpProps, P & ISignUpProps> => graphql<ISignUpResponse, IWithSignUpProps & P, ISignUpProps & P>(signupUserMutation, {
  props: ({ ownProps: { onSuccess, onError }, mutate }) => ({
    signUp: async (name, email, password) => {
      try {
        /*
				 * Sign up with given email and password
				 */
        const signupResponse = await mutate({
          variables: {
            name,
            email,
            password,
          },
        })

        const token = signupResponse.data.signupUser.token
        if (token) {
          onSuccess(signupResponse.data.signupUser)
        } else {
          throw new Error('No token on response')
        }
      } catch (err) {
        onError(err)
      } finally {
        console.log(123)
      }
    },
  }),
})
