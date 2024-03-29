import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams } from 'expo-router'

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    })

    if (!result.canceled) {
        setImage(result.assets[0].uri)
    }
  }
  
  
  const resetFields = () => {
    setName('');
    setPrice('');
  }

  const validateInput = () => {
    setErrors('')
    if (!name) {
        setErrors('Name is Required')
        return false
    }
    if (!price) {
        setErrors('Price is Required')
        return false
    }
    if (isNaN(parseFloat(price))) {
        setErrors('Price is not a number')
        return false
    }
    return true
  }

  const onSubmit = () => {
    if (isUpdating) {
        onUpdate()
    } else {
        onCreate()
    }
  }

  const onCreate = () => {

    if (!validateInput()) {
        return;
    }

    console.warn('Creating Product', name)

    resetFields()
  }

  const onUpdate = () => {

    if (!validateInput()) {
        return;
    }

    console.warn('Creating Product', name)

    resetFields()
  }

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete
      }
    ])
  }

  const onDelete = () => {
    console.warn("!!DELETING!!")
  }
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating? 'Update Product' : 'Create Product' }} />
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
      
      <Text style={styles.label}>Name</Text>
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder="Name" 
        style={styles.input} />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput 
        value={price}
        onChangeText={setPrice}
        placeholder="Price" 
        style={styles.input} 
        keyboardType='numeric' />

      <Text style={{color: 'red'}}>{errors}</Text>
      <Button onPress={onSubmit} text={ isUpdating? 'Update' : 'Create' }/>
      { isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center'
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint
  },
  label: {
    color: 'gray',
    fontSize: 16
  },
  input: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 20
    },
  
})

export default CreateProductScreen