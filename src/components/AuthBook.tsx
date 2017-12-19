import React from 'react'
import { View, ScrollView, Image, ImageBackground, Dimensions, Text, TouchableOpacity, StyleSheet, ImageStyle, ViewStyle, TextStyle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ImageSource } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#FFF',
  } as ViewStyle,
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  } as ViewStyle,
  closeImage: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  } as ImageStyle,
  formContainer: {
    width: SCREEN_WIDTH,
  } as ViewStyle,
  formWrapper: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 45,
    alignItems: 'stretch',
  } as ViewStyle,
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
  } as ViewStyle,
  logoWrapper: {
    marginVertical: 46,
    alignItems: 'center',
  } as ViewStyle,
  logo: {
    width: 168,
    height: 168,
  } as ViewStyle,
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  signInCallPrefix: {
    color: '#FFF',
  } as TextStyle,
  signInCall: {
    fontWeight: '700',
    marginLeft: 4,
    color: '#FFF',
  } as TextStyle,
  formSeparator: {
    height: 1,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    width: 124,
    marginVertical: 42,
  } as ViewStyle,
  buttonText: {
    paddingVertical: 8,
  } as TextStyle,
})

const FormSeparator = () => <View style={styles.formSeparator} />

export interface IAuthProps {
  backgroundImageSource: ImageSource,
  logoSource: ImageSource,
  closeImageSource: ImageSource,
  onClose: () => void;
  children: (goToPage: (index: number) => void) => any;
}

export class AuthBook extends React.Component<IAuthProps, {}> {
  public scrollView: any
  constructor(props) {
    super(props)
  }
  private goToPage = (index: number) => this.scrollView.scrollTo({ x: SCREEN_WIDTH * index, y: 0, animated: true })

  public render() {
    const {
      backgroundImageSource,
      logoSource,
      closeImageSource,
    } = this.props
    return (
      <ImageBackground source={backgroundImageSource} resizeMode='cover' style={styles.backgroundImage}>
        <KeyboardAwareScrollView extraScrollHeight={80}>
          <View style={styles.logoWrapper}>
            <Image source={logoSource} resizeMode='contain' style={styles.logo} />
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.props.onClose}
          >
            <Image source={closeImageSource} resizeMode='contain' style={styles.closeImage} />
          </TouchableOpacity>
          <ScrollView
            style={styles.formContainer}
            ref={(ref) => this.scrollView = ref}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {this.props.children(this.goToPage).map((page, i) => (
              <View key={`${i}`} style={styles.formWrapper}>
                {page}
              </View>
            ))}
          </ScrollView>
        </KeyboardAwareScrollView>
      </ImageBackground>
    )
  }
}