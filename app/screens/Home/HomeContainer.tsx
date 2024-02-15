import { View, Text } from 'react-native'
import React from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import HomeScreen from './HomeScreen'
import { database } from 'services/watermelon'

interface Props extends NavigationV5Props {

}

const HomeContainer = (props: Props) => {

    const _onItemPress = (item: any) => {
        props.navigation.navigate('CART_LIST_ITEM', { item })
    }

    return (
        <HomeScreen
            goBack={() => props.navigation.goBack()}
            onItemPress={_onItemPress}
        />


    )
}

export default HomeContainer