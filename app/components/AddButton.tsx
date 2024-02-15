import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import modules from 'modules'
import _styles from '@styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PressableScale from './PressableScale'
import { NokoraBold } from 'customs/customFont'
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'

type Props = {}


const ANIMATION_DURATION = 300
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons)

const AddButton = (props: Props) => {

    const addActive = useSharedValue(false)

    const addActiveProgress = useDerivedValue(() => {
        return addActive.value
            ?
            withTiming(1, { duration: ANIMATION_DURATION })
            :
            withTiming(0, { duration: ANIMATION_DURATION })
    }, [addActive])



    const animatedButtonActive = useAnimatedStyle(() => {
        return {
            // opacity: interpolate(addActiveProgress.value, [0, 1], [1, 0], Extrapolate.CLAMP),
            backgroundColor: interpolateColor(addActiveProgress.value, [0, 1], [modules.LIGHT_BLACK, modules.BLUE]),
        }
    })
    const animatedButtonInactive = useAnimatedStyle(() => {
        return {
            opacity: interpolate(addActiveProgress.value, [0, 1], [1, 0], Extrapolate.CLAMP),
            // backgroundColor: interpolateColor(addActiveProgress.value, [0, 1], [modules.LIGHT_BLACK, modules.BLUE]),
        }
    })

    const animatedPlusIcon = useAnimatedStyle(() => {
        return {
            opacity: interpolate(addActiveProgress.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        }
    })
    const animatedEnterIcon = useAnimatedStyle(() => {
        return {
            opacity: interpolate(addActiveProgress.value, [0, 1], [0, 1], Extrapolate.CLAMP),
            transform: [
                {
                    rotate: `${interpolate(addActiveProgress.value, [0, 1], [0, 45], Extrapolate.CLAMP)}deg`
                }
            ]
        }
    })




    return (

        <PressableScale
            onPress={() => {
                addActive.value = !addActive.value
            }}
            style={[styles.container, animatedButtonActive]}>
            <AnimatedIonicons name={'add'} style={[styles.icon, animatedPlusIcon]} />
            {/* {addActive.value && (
                <AnimatedIonicons name={'enter-outline'} style={[styles.icon, animatedEnterIcon]} />
            )
            } */}
        </PressableScale>
        // <PressableScale onPress={() => {
        //     addActive.value = true
        // }}
        //     style={[styles.container, animatedButtonActive]}>
        //     <AnimatedIonicons name={'add'} style={[styles.icon, animatedPlusIcon]} />
        //     {addActive.value &&
        //         <PressableScale
        //             style={[styles.container, animatedButtonInactive]}
        //             onPress={() => {
        //                 addActive.value = false
        //             }}>
        //             <AnimatedIonicons name={'enter-outline'} style={[styles.icon, animatedEnterIcon]} />
        //         </PressableScale>
        //     }
        // </PressableScale>

    )
}

export default AddButton


const styles = StyleSheet.create({
    container: {
        ..._styles.center,
        backgroundColor: modules.LIGHT_BLACK,
        borderRadius: 100,
        // aspectRatio: 1,
        padding: modules.FONT_S,
        position: 'absolute',
        bottom: 40,
        right: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },

    icon: {
        ...NokoraBold,
        fontSize: 35,
        color: modules.WHITE,
    },
})