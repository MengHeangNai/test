import { View, StyleSheet, ViewProps } from 'react-native'
import React, { ReactNode } from 'react'

interface Props extends ViewProps {
    children?: ReactNode
    style?: ViewProps['style']
}

const BottomShadow = (props: Props) => (
    <View style={[styles.container, props.style]}>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        paddingBottom: 3,
    }
});



export default BottomShadow