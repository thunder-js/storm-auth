import { graphql } from 'react-apollo'
import { currentUser } from './queries'
import { ComponentDecorator } from 'react-apollo/types';

export type User = {
  id: string
}
export type Viewer = {
  user: User
}
export type Response = {
  viewer?: Viewer
}

export interface IInputProps {

}
export interface IProps {
  authenticated: boolean,
  loading: boolean
}

export const withIsAuthenticated: ComponentDecorator<IInputProps, IProps> = graphql<Response, IInputProps, IProps>(currentUser, {
  props: ({ data }) => ({
    authenticated: !!((data.viewer && data.viewer.user && data.viewer.user.id)),
    loading: data.loading
  })
})
