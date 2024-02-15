import {BlurView, VibrancyViewProps} from '@react-native-community/blur'
import modules from 'modules'
import React, {ReactNode} from 'react'
import {Platform, View, ViewProps} from 'react-native'

interface Props extends VibrancyViewProps, ViewProps {
  children?: ReactNode
  androidBackground?: string
}

function BlurAndView(props: Props) {
  const android = Platform.OS === 'android'

  const getAndroidColor = () => {
    switch (props.blurType) {
      case 'ultraThinMaterialDark':
        return modules.PLACE_HOLDER
      case 'chromeMaterialLight':
        return modules.WHITE
      default:
        return modules.PLACE_HOLDER
    }
  }

  if (android) {
    return (
      <View {...props} style={[props.style, {backgroundColor: props.androidBackground || getAndroidColor()}]}>
        {props.children}
      </View>
    )
  }
  return <BlurView {...props}>{props.children}</BlurView>
}

export default BlurAndView
