import { Text, FlatList, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SafeArea from 'components/SafeArea'
import products from 'dummy/data/products'
import _styles from '@styles'

type Props = {
  goBack: () => void
  onItemPress: (item: any) => void
}

const HomeScreen = (props: Props) => {

  return (
    <>
      <SafeArea edges={'safeTop'} />
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <><TouchableOpacity key={index} style={{
            flex: 1,
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
            onPress={() => {
              props.onItemPress(item)
            }}
          >
            <Image source={{ uri: item.image }} style={{
              width: '100%',
              height: 200,
              borderRadius: 10,
            }} />

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>${item.price}</Text>

            <Text style={{
              fontSize: 16,
              marginTop: 10,
            }}>{item.name}</Text>

          </TouchableOpacity>
            <View style={_styles.fake} />
          </>
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  )
}

export default HomeScreen
