import { graphql } from 'react-apollo'
import { currentUser } from './queries'
import { ComponentDecorator } from 'react-apollo/types';

export interface IUser {
  id: string
}
export interface IViewer {
  user: IUser
}
export interface IResponse {
  viewer?: IViewer,
}

export interface IProps {
  authenticated: boolean,
  loading: boolean
}

export const withIsAuthenticated: ComponentDecorator<{}, IProps> = graphql<IResponse, {}, IProps>(currentUser, {
  props: ({ data }) => ({
    authenticated: !!((data.viewer && data.viewer.user && data.viewer.user.id)),
    loading: data.loading,
  }),
})
