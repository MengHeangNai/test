import SafeArea from 'components/SafeArea';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { database } from 'services/watermelon';
import AntDesgin from 'react-native-vector-icons/AntDesign';

type Props = {
    cartItems: any
    onDelete: (id: any) => void
    onEdit: (item: any) => void
}

const CartScreen = (props: Props) => {

    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <Image
                style={styles.itemImage}
                source={{ uri: item.image }}
                resizeMode="contain" />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text>Size: {item.size}</Text>
                <Text>Quantity: {item.quantity}</Text>
            </View>
            <View style={{
                marginRight: 10,
            }}>
                <TouchableOpacity onPress={() => props.onDelete(item.id)}>
                    <AntDesgin name="delete" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginTop: 10
                }} onPress={() => props.onEdit(item)}>
                    <AntDesgin name="edit" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeArea edges={'safeTop'} />
            <FlatList
                data={props.cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        margin: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        padding: 10,
        elevation: 3, // Add shadow on Android
        shadowColor: '#000', // Add shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    itemImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
    },
});

export default CartScreen;
