import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'

export interface IContext {
  client: ApolloClient<any>
}
export default async (context: IContext) => {
  await AsyncStorage.removeItem('shouldGoToMain')
  await AsyncStorage.removeItem('token')
  if (context.client) {
    context.client.resetStore()
  }
}
