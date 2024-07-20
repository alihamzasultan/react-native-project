import { View, Text, FlatList,StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { data } from '../constants/data'
import { theme } from '../constants/theme'
import { wp,hp } from '../helpers/common'

const Categories = () => {
  return (
    <FlatList
    horizontal
    contentContainerStyle={StyleSheet.flatlistContainer}
    showsHorizontalScrollIndicator={false}
    data={data.categories}
    keyExtractor={item=> item}
    renderItem={({item,index})=>(
        <CategoryItem
        title={item}
        index={index}
        />
  )}
/>
  )
}
const CategoryItem =({title,index})=>{
    return(
        <View>
            <Pressable style={[styles.category]}>
                 <Text style={[styles.title]}>{title}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    flatlistContainer:{
        paddingHorizontal: wp(4),
        gap:8
    },
    category:{
        padding:12,
        paddingHorizontal:15,
        borderWidth:1,
        borderColor: theme.colors.grayBG,
        backgroundColor:theme.colors.white,
        borderRadius:theme.radius.lg,
        borderCurve:'continuous'

    },
    title:{
        fontSize: hp(1.7),
        fontWeight:theme.fontWeights.medium
    }

})

export default Categories