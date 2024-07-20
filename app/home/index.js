import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { wp,hp } from '../../helpers/common';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Categories from '../../components/categories';

const HomeScreen = () => {
    const {top} = useSafeAreaInsets();
    const paddingTop = top>0? top+10: 30;

    const [search, setSearch] = useState('');
    

  return (
    <View style={[styles.container,{paddingTop}]}>
        <View  style={styles.header}>
            <Pressable>
                <Text style={styles.title}>
                    Pixels
                </Text>
            </Pressable>
            <Pressable>
                <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)}/>
            </Pressable>
        </View>

        <ScrollView
        contentContainerStyle={{gap:15}}
        >
            <View style={styles.searchBar} >
                <View style={styles.searchIcon}>

                    <Feather name="search" size={24} color={theme.colors.neutral(0.4)}/>

                </View>

                <TextInput
                placeholder='Search for photos...'
                value={search}
                onChangeText={value=> setSearch(value)}
                style={styles.searchInput}
                />
                {
                    search &&(
                        <Pressable style={styles.closeIcon}>
                        <Ionicons name="close" size={24} color={theme.colors.neutral(0.4)}
                        />
                    </Pressable>
                    )
                }
             
            </View>
        <View style={styles.categories}>
            <Categories/>
        </View>
        </ScrollView>
    
    </View>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:15
},
header:{
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
},
title:{
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color:theme.colors.neutral(0.9)
},
searchBar:{
marginHorizontal:wp(4),
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
borderWidth:1,
borderColor:theme.colors.grayBG,
backgroundColor:theme.colors.white,
padding:6,
paddingLeft:10,
borderRadius:theme.radius.lg,

},
searchIcon:{
    padding:8
},
searchInput:{
    flex:1,
    borderRadius:theme.radius.sm,
    paddingVertical:10,
    fontsize:hp(1.8),
   
    
    
},
closeIcon:{
    backgroundColor:theme.colors.neutral(0.1),
    padding:8,
    borderRadius:theme.radius.sm,
}

});

export default HomeScreen;
 