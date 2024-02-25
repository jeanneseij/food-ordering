import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const CartScreen = () => {
  const { items, total } = useCart()
    
  return (
    <View style={{flex: 1}}>
      {/* <Text>Cart Items Length: {items.length}</Text> */}
      <FlatList 
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        contentContainerStyle={{gap: 10, padding: 10}}
      />
      <Text style={{marginTop: 20, fontSize: 20, fontWeight: '500'}}> Total: ${total}</Text>
      <Button text="Checkout" style={{marginTop: 'auto'}} />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen