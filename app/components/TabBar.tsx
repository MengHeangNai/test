import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Pro';

export const TAB_DATA = {
  HOME: {
    label: 'Home',
    name: 'HOME',
    Icon: AntDesign,
    iconName: 'home',
  },
  CART: {
    label: 'Cart',
    name: 'CART',
    Icon: AntDesign,
    iconName: 'shoppingcart',
  },
  PROFILE: {
    label: 'Profile',
    name: 'PROFILE',
    Icon: FontAwesome,
    iconName: 'user-o',
  },
};

function TabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.bottomNavBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Tab = TAB_DATA[route.name as keyof typeof TAB_DATA];
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.textNavBtnEnd}>
            <Tab.Icon
              name={Tab.iconName}
              style={[styles.icon, { color: isFocused ? '#673ab7' : '#222' }]}
            />
            <Text
              style={[
                styles.textNavBot,
                { color: isFocused ? '#673ab7' : '#222' },
              ]}>
              {Tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  bottomNavBar: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  textNavBtnEnd: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNavBot: {
    fontSize: 10,
    color: '#808080',
    paddingTop: 2,
  },
  icon: {
    fontSize: 23,
    color: 'black',
  },
});
