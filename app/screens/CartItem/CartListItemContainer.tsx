import React from 'react'
import CartListItemScreen from './CartListItemScreen'
import { NavigationV5Props } from 'routes/RouteFun'
import { database } from 'services/watermelon'
import { Alert } from 'react-native'

interface Props extends NavigationV5Props { }

const CartListItemContainer = (props: Props) => {
    const _addToCart = async (item: any, size: any, quantity: any, price: any) => {
        await database.write(async () => {
            await database.get('carts').create((cart: any) => {
                cart.product_id = item.id;
                cart.image = item.image;
                cart.old_price = item.price;
                cart.price = price;
                cart.name = item.name;
                cart.size = size;
                cart.quantity = quantity;
            })
                .then(() => {
                    Alert.alert('Item added to cart')
                })
                .catch((error: any) => {
                    console.log(error)
                    console.log(
                        database.adapter.schema.tables.carts
                    )
                })
        })
    }

    const _onEdit = async (item: any, size: any, quantity: any, price: any) => {
        await database.write(async () => {
            const cart = await database.get('carts').find(item.id);
            await cart.update((cart: any) => {
                cart.product_id = item.id;
                cart.image = item.image;
                cart.price = price;
                cart.name = item.name;
                cart.size = size;
                cart.quantity = quantity;
            })
                .then(() => {
                    props.navigation.navigate('CART')
                    console.log('Item updated')
                })
        })
    }


    return (
        <CartListItemScreen
            addToCart={_addToCart}
            onEdit={_onEdit}
        />
    )
}

export default CartListItemContainer