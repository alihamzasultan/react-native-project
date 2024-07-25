
import { View,Text,StyleSheet, Pressable } from "react-native"

import { theme } from "../constants/theme"
import { hp } from "../helpers/common"
import { data } from "../constants/data"
import { capitalize } from "../helpers/common"


export const SectionView = ({title, content}) => {


    return(
      <View style={styles.sectionContainer}>

        <Text style={styles.sectionTitle}>{title}</Text>
      {content}
      </View>
    )
  }
  export const CommonFilterRow = ({ data, filterName, filters, setFilters }) => {
    const onselect = (item) => {
      setFilters({ ...filters, [filterName]: item });
    };
  
    return (
      <View style={styles.flexRowWrap}>
        {data && data.map((item, index) => {
          const isActive = filters && filters[filterName] === item;
          const backgroundColor = isActive ? theme.colors.neutral(0.7) : 'white';
          const color = isActive ? 'white' : theme.colors.neutral(0.7);
  
          return (
            <Pressable
              onPress={() => onselect(item)}
              key={index}
              style={[styles.outlinedButton, { backgroundColor }]}>
              <Text style={[styles.outlinedButtonText, { color }]}>{capitalize(item)}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  export const ColorFilter = ({ data, filterName, filters, setFilters }) => {
    const onselect = (item) => {
      setFilters({ ...filters, [filterName]: item });
    };
  
    return (
      <View style={styles.flexRowWrap}>
        {data && data.map((item, index) => {
          const isActive = filters && filters[filterName] === item;
       let borderColor = isActive? theme.colors.neutral(0.4): 'white';
  
          return (
            <Pressable
              onPress={() => onselect(item)}
              key={index}
              
              >
            <View style = {[styles.colorWrapper,{borderColor}]}>
              <View style = {[styles.color, {backgroundColor: item}]}/>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  };
  
  
  const styles = StyleSheet.create({

    sectionContainer: {
        gap:8
    },
    sectionTitle: {
        fontSize: hp(2,4),
        fontWeight: theme.fontWeights.medium,
        color:theme.colors.neutral(0.8)
    },
    outlinedButton: {
      padding:8,
      paddingHorizontal:14,
      borderWidth:1,
      borderWidth: 1,
      borderColor: theme.colors.grayBG,
      borderRadius: theme.radius.xs,
      borderCurve:'continous'
    },
    flexRowWrap:{
      gap:10,
      flexDirection:'row',
      flexWrap:'wrap'
    },
    colorWrapper: {
      padding: 3,
      borderRadius: theme.radius.sm,
      borderWidth: 2,
      borderCurve: 'continuous'

    },
    color: {
      height:30,
      width:40,
      borderRadius: theme.radius.sm-3,
      borderCurve:'continuous'
    }
  })