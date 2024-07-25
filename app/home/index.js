import { FontAwesome6 } from '@expo/vector-icons';
import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { wp, hp } from '../../helpers/common';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import debounce from 'lodash.debounce';
import FilterModal from '../../components/filtersModal';


var page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = true) => {
    console.log('fetchImages params: ', params, append);
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
        if (append) {
            setImages((prevImages) => [...prevImages, ...res.data.hits]);
        } else {
            setImages(res.data.hits);
        }
    } else {
        console.error('Failed to fetch images:', res.msg);
    }
};

const clearThisFilter = (filterName) => {
  // Create a new copy of filters to avoid mutating the state directly
  const updatedFilters = { ...filters };
  // Delete the specified filter
  delete updatedFilters[filterName];
  // Update the state with the new filters object
  setFilters(updatedFilters);
  
  // Reset the page and images
  page = 1;
  setImages([]);
  
  // Prepare parameters for fetching images
  const params = {
    page,
    ...updatedFilters
  };
  
  if (activeCategory) params.category = activeCategory;
  if (search) params.q = search;
  
  // Fetch images with the updated parameters
  fetchImages(params, false);
};


const openFilterModal =() =>{
    console.log("pressed")
    modalRef?.current?.present();
}

const closeFilterModal =() =>{
    modalRef?.current?.close();
}

const applyFilters = ()=>{
  console.log("apply filters")
  if(filters){
    page =1;
    setImages([]);
    let params ={
      page,
      ...filters
    }
    if(activeCategory)params.category= activeCategory;
    if(search) params.q=search;
    fetchImages(params, false);
  }
  closeFilterModal();
}

const resetFilters = ()=>{

  setActiveCategory(null);
    if (filters) {
        page = 1;
        setFilters(null);
        setImages([]);
        let params = { page };
        if (activeCategory) params.category = activeCategory;
        if (search) params.q = search;
        fetchImages(params, false);
    }
    
  closeFilterModal();
}



  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    setSearch('')
    page = 1;
    fetchImages({ page, category: cat });
    setImages([]);
    page = 1;
    let params ={
      page,
      ...filters
    }
    if (cat) params.category = cat;
    fetchImages(params, false);
    
  };

  const handleSearch = (text) => {
    console.log('Search text:', text);
    setSearch(text);
    page = 1;
    setImages([]);
    let params = { page, q: text, ...filters };

    if (text.length > 2 || text === "") {
        fetchImages(params, false);
    }
};

  


  const debouncedHandleSearch = useRef(debounce(handleSearch, 400)).current;

  useEffect(() => {
    debouncedHandleSearch(search);
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [search]);

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>
            Pixels
          </Text>
        </Pressable>
        <Pressable onPress={openFilterModal}>
          <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
          </View>

          <TextInput
            placeholder='Search for photos...'
            value={search} // Ensure input value is controlled by the search state
            ref={searchInputRef}
            onChangeText={setSearch} // Directly set the search text, debouncing is handled by useEffect
            style={styles.searchInput}
          />
          {
            search && (
              <Pressable style={styles.closeIcon} onPress={() => setSearch('')}>
                <Ionicons name="close" size={24} color={theme.colors.neutral(0.4)} />
              </Pressable>
            )
          }
        </View>

        <View style={styles.categories}>
          <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
        </View>

{/* filters checks */}

{
  filters && (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {
          Object.keys(filters).map((key, index) => {
            return (
              <View key={key} style={styles.filterItem}>
                {
                  key=='colors'?(

                    <View style={{
                      height:20,
                      width:30,
                      borderRadius:7,
                      backgroundColor:filters[key],
                    }}/>
                  ):(
                    <Text style={styles.filteritemText}>{filters[key]}</Text>
                  )
                }
              
                <Pressable style={styles.filterCloseIcon} onPress={()=> clearThisFilter(key)}>
                <Ionicons name="close" size={24} color={theme.colors.neutral(0.9)} />
                </Pressable>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}





        {/* Images Screen */}
        <View>
          {
            images.length > 0 && <ImageGrid images={images} />
          }
        </View>
      </ScrollView>


            <View style={{marginBottom:70, marginTop: images.length>0? 10:70}}>
              <ActivityIndicator size ="large"/>
            </View>









      {/* filters modal */}
      <FilterModal 
      modalRef={modalRef}
      filters={filters}
      setFilters={setFilters}
      onClose={closeFilterModal}
      onApply={applyFilters}
      onReset={resetFilters}


      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9)
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  filters:{
    paddingHorizontal:wp(4),
    gap:10
  },
  filterItem:{
    backgroundColor:theme.colors.grayBG,
    padding:3,
    flexDirection:'row',
    alignItems:'center',
    borderRadius: theme.radius.xs,
    padding: 8,
    gap: 10,
    paddingHorizontal: 10,
  },
  filteritemText:{
   fontSize: hp(1.7)
  },
  filterCloseIcon:{

    padding:4,
    backgroundColor: theme.colors.neutral(0.2),
    borderRadius: 7
  }
});

export default HomeScreen;
