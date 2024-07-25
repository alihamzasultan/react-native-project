import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { MasonryFlashList } from '@shopify/flash-list'
import ImageCard from './imageCard'
import { wp , getColumnCount} from '../helpers/common'

const ImageGrid = ({images}) => {

    const columns = getColumnCount();
  return (
    <View style={StyleSheet.container}>
        <MasonryFlashList
        data={images}
        numColumns={columns}
        initialNumtoRender = {1000}
        contentContainerStyle={StyleSheet.listContainerstyle}
        renderItem={({ item, index }) => <ImageCard item={item} columns={columns} index={index}/>}
        />
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        inHeight:3,
        width: wp(100)
    },
    listContainerstyle: {
        paddingHorizontal:wp(4),
    }
})

export default ImageGrid