import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import React from 'react'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

interface Props extends PressableProps {
  children?: any
  duration?: number
  haptic?: boolean
  style?: ViewStyle | ViewStyle[] | StyleProp<ViewStyle>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

function PressableScale({ duration, haptic = false, ...props }: Props) {
  const active = useSharedValue(false)

  const progress = useDerivedValue(() => {
    return active.value
      ? withTiming(1, { duration: duration ?? 150 })
      : withTiming(0, { duration: duration ?? 150 })
  }, [active])

  const pressAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(progress.value, [0, 1], [1, .95], Extrapolate.CLAMP),
        },
      ],
    }
  })

  const onPress = (e: GestureResponderEvent) => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    }
    if (haptic) {
      ReactNativeHapticFeedback.trigger('impactLight', options)
    }
    props.onPress && props.onPress(e)
  }

  return (
    <AnimatedPressable
      {...props}
      style={[props.style, pressAnimation]}
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      onPress={onPress}
    >
      {props.children}
    </AnimatedPressable>
  )
}

export default PressableScale
