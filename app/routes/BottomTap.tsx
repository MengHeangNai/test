import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar, { TAB_DATA } from '../components/TabBar';
import HomeContainer from 'screens/Home/HomeContainer';
import CartContainer from 'screens/Cart/CartContainer';
import CartListItemContainer from 'screens/CartItem/CartListItemContainer';
import ChatContainer from 'screens/Chat/ChatContainer';

const Tab = createBottomTabNavigator();

function AppTab() {
    return (
        <>
            <Tab.Navigator
                screenOptions={{ headerShown: false }}
                tabBar={props => <TabBar {...props} />}>
                <Tab.Screen name={TAB_DATA.HOME.name} component={HomeContainer} />
                <Tab.Screen name={TAB_DATA.CART.name} component={CartContainer} />
                <Tab.Screen name={TAB_DATA.PROFILE.name} component={ChatContainer} />
            </Tab.Navigator></>
    );
}

export default AppTab;
