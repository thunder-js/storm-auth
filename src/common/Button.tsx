import React from 'react'
import { Image, ActivityIndicator, TouchableOpacity, Text, TouchableOpacityProperties } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(TouchableOpacity)`
  height: 54px;
  background-color: rgba(255, 255, 255, 0.42);
  align-items: center;
  justify-content: center;
  border-radius: 27px;
  flex-direction: row;
`

const ButtonText = styled(Text)`
  color: #FFF;
`

export interface IAuthButtonProps {
  title: string,
  imageSource?: any,
  loading?: boolean,
}

export class Button extends React.Component<IAuthButtonProps & TouchableOpacityProperties, {}> {
  render() {
    const {
      title,
      imageSource,
      loading,
      ...props
    } = this.props

    return (
      <Wrapper {...props}>
        {loading &&
          <ActivityIndicator color='#FFF' />}
        {(!loading && imageSource) &&
          <Image
            style={{marginRight: 14}}
            resizeMode='contain'
            source={imageSource}
          />}
        {!loading && (
        <ButtonText>
          {title}
        </ButtonText>)}
      </Wrapper>
    )
  }
}
