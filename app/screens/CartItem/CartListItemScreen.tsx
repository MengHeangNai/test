import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Button from 'components/Button'
import { PizzaSize } from 'dummy/types'

type Props = {
    addToCart: (item: any, size: any, quantity: any, price: any) => void
    onEdit: (item: any, size: any, quantity: any, price: any) => void
}

const CartListItemScreen = (props: Props) => {
    const route = useRoute<any>()

    const item = route.params.item
    const data = route.params.data

    const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    }

    const decrementQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    }

    const price = route.params.data ? data?.old_price * quantity : item?.price * quantity

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: route.params.data ? data.image : item?.image,
                }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.subtitle}>Select size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable
                        onPress={() => setSelectedSize(size)}
                        key={size}
                        style={[
                            styles.size,
                            {
                                backgroundColor: size === selectedSize ? 'gainsboro' : 'white',
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.sizeText,
                                { color: size === selectedSize ? 'black' : 'gray' },
                            ]}
                        >
                            {size}
                        </Text>
                    </Pressable>
                ))}
            </View>
            <Text style={styles.subtitle}>Select quantity</Text>
            <View style={[styles.sizes, { alignItems: 'center' }]}>
                <Button onPress={decrementQuantity} text="-" />
                <Text style={styles.sizeText}>{quantity}</Text>
                <Button onPress={incrementQuantity} text="+" />
            </View>
            <Text style={styles.price}>Price: ${price}</Text>
            <Button onPress={() =>
                route.params.data ?
                    props.onEdit(
                        data,
                        selectedSize,
                        quantity,
                        price,
                    )
                    :
                    props.addToCart(
                        item,
                        selectedSize,
                        quantity,
                        price,
                    )} text="Add to cart" />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    subtitle: {
        marginVertical: 10,
        fontWeight: '600',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 'auto',
    },

    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    size: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
    },
});

export default CartListItemScreen