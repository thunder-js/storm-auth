import { ImageRequireSource, ImageURISource } from 'react-native'
export type ImageSource = ImageURISource | ImageURISource[] | ImageRequireSource

export interface ISignInEmailProps {
  signInEmail: (email: string, password: string) => Promise<any>
  loadingEmail: boolean
}

export interface ISignUpProps {
  signUp: (name: string, email: string, password: string) => Promise<any>;
  loading: boolean;
}

export interface ISignInFacebookProps {
  signInFacebook: () => Promise<any>
  loadingFacebook: boolean
}
