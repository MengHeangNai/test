import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SplashProvider } from 'hooks/SplashProvider'
import HomeContainer from 'screens/Home/HomeContainer'
import CartListItemContainer from 'screens/CartItem/CartListItemContainer'
import CartContainer from 'screens/Cart/CartContainer'
import AppTab from './BottomTap'

const HomeStack = createNativeStackNavigator()

function HOME_STACK() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, orientation: 'portrait_up' }}>
      <HomeStack.Screen name="APP_TAB" options={{ animation: 'fade' }} component={AppTab} />
      <HomeStack.Screen name="HOME" options={{ animation: 'fade' }} component={HomeContainer} />
      <HomeStack.Screen name="CART_LIST_ITEM" options={{ animation: 'fade' }} component={CartListItemContainer} />
      <HomeStack.Screen name="CART" options={{ animation: 'fade' }} component={CartContainer} />
    </HomeStack.Navigator>
  )
}

export default function App() {
  return (
    // <SplashProvider>
    <NavigationContainer>
      <HOME_STACK />
    </NavigationContainer>
    // </SplashProvider>
  )
}
