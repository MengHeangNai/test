import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CartScreen from './CartScreen'
import { database } from 'services/watermelon'
import { NavigationV5Props } from 'routes/RouteFun'

interface Props extends NavigationV5Props { }

const CartContainer = (props: Props) => {

    const [cartItems, setCartItems] = useState<any>([]);


    const _fetchCartItems = async () => {
        await database.read(async () => {
            const items = await database.get('carts').query().fetch();
            setCartItems(items);
        });
    }

    useEffect(() => {
        _fetchCartItems();
    }, [cartItems]);

    const _onDelete = async (id: any) => {
        await database.write(async () => {
            const item = await database.get('carts').find(id);
            await item.destroyPermanently();
        })
    }

    const _onEdit = async (data: any) => {
        props.navigation.navigate('CART_LIST_ITEM', { data })
    }

    return (
        <CartScreen
            cartItems={cartItems}
            onDelete={_onDelete}
            onEdit={_onEdit}
        />
    )
}

export default CartContainer