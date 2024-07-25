import { View, Text, StyleSheet, Button, Image, Platform, Pressable } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { hp, wp } from '../../helpers/common';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { ActivityIndicator } from 'react-native';
import { Entypo, Feather, Octicons } from 'expo-vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import * as FileSystem from 'expo-file-system';


const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  let uri = item?.webformatURL;
  const [status, setStatus] = useState('loading');

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;
    const maxWidth = Platform.OS == 'web' ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const onLoad = () => {
    setStatus('');
  };
const handleDownloadImage=async()=>{

}
const handleShareImage=async()=>{

}
  return (
    <BlurView style={styles.container} tint='dark' intensity={60}>
      <View style={getSize()}>
        <View style={styles.loading}>
            {
                status == 'loading' && <ActivityIndicator size="large" color='white'/>
            }

        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={{ uri }}
          onLoad={onLoad}
        />
      </View>

     <View style = {styles.buttons}>

        <Animated.View entering={FadeInDown.springify()}>
            <Pressable style ={styles.button} onPress={()=> router.back()}>
                <Octicons name="x" size ={24} color="white"/>
            </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Pressable style ={styles.button} onPress={handleDownloadImage}>
                <Feather name="download" size ={24} color="white"/>
            </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Pressable style ={styles.button} onPress={handleShareImage}>
                <Entypo name="share" size ={22} color="white"/>
            </Pressable>
        </Animated.View>

     </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  loading:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons:{
    marginTop: 40,
    flexDirection: 'row',
    alignItems:'center',
    gap:50,

  },
  button:{
    height: hp(6),
    width: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous'
  }
});

export default ImageScreen;
