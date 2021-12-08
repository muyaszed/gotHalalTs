import React from 'react';
import {Text} from 'react-native';
import {View, StyleSheet, FlatList, Image} from 'react-native';

interface FoodNoteItem {
  id: number;
  avatar: string;
}

interface Props {
  list: FoodNoteItem[];
}

const foodNoteItem = ({item}: {item: FoodNoteItem}) => (
  <View style={styles.OuterAvatar}>
    <Image
      style={styles.FoodNoteAvatar}
      source={{uri: item.avatar}}
      resizeMode="cover"
    />
  </View>
);

const FoodNotes = ({list}: Props) => {
  return (
    <View
      style={
        list.length === 0
          ? styles.NoFoodNoteContainer
          : styles.FoodNoteListContainer
      }>
      {list.length === 0 ? (
        <Text>There is no foodnote for today</Text>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={list}
          renderItem={foodNoteItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default FoodNotes;

const styles = StyleSheet.create({
  FoodNoteListContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  NoFoodNoteContainer: {
    margin: 10,
    height: 80,
    borderWidth: 1,
    borderColor: '#5b926c',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OuterAvatar: {
    height: 80,
    width: 80,
    borderRadius: 45,
    borderColor: '#5b926c',
    borderWidth: 1,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FoodNoteAvatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderColor: '#97f7b6',
    borderWidth: 1,
  },
});
