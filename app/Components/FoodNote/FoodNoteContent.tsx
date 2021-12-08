import React from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions} from 'react-native';
import {Text, Button} from '@codler/native-base';
import Overlay from '../Generic/overlay';

//Temp foodnote data

const subscribefoodNotesItem = [
  {
    id: 1,
    avatar: 'https://lorempixel.com/400/200/people/1',
    foodNotes: [
      {
        note: 'This is the first note',
        foodImage: 'https://lorempixel.com/400/200/food/1',
      },
      {
        note: 'This is the  note',
        foodImage: 'https://lorempixel.com/400/200/food/1',
      },
    ],
  },
  {
    id: 2,
    avatar: 'https://lorempixel.com/400/200/people/2',
    foodNotes: [
      {
        note: 'This is the second note',
        foodImage: 'https://lorempixel.com/400/200/food/2',
      },
    ],
  },
  {
    id: 3,
    avatar: 'https://lorempixel.com/400/200/people/3',
    foodNotes: [
      {
        note: 'This is the third note',
        foodImage: 'https://lorempixel.com/400/200/food/3',
      },
    ],
  },
  {
    id: 4,
    avatar: 'https://lorempixel.com/400/200/people/4',
    foodNotes: [
      {
        note: 'This is the fourth note',
        foodImage: 'https://lorempixel.com/400/200/food/4',
      },
    ],
  },
  {
    id: 5,
    avatar: 'https://lorempixel.com/400/200/people/5',
    foodNotes: [
      {
        note: 'This is the fifth note',
        foodImage: 'https://lorempixel.com/400/200/food/5',
      },
    ],
  },
  {
    id: 6,
    avatar: 'https://lorempixel.com/400/200/people/6',
    foodNotes: [
      {
        note: 'This is the sixth note',
        foodImage: 'https://lorempixel.com/400/200/food/6',
      },
    ],
  },
  {
    id: 7,
    avatar: 'https://lorempixel.com/400/200/people/7',
    foodNotes: [
      {
        note: 'This is the seventh note',
        foodImage: 'https://lorempixel.com/400/200/food/7',
      },
    ],
  },
  {
    id: 8,
    avatar: 'https://lorempixel.com/400/200/people/8',
    foodNotes: [
      {
        note: 'This is the eighth note',
        foodImage: 'https://lorempixel.com/400/200/food/8',
      },
    ],
  },
];

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 50,
    paddingRight: 50,
  },
});

const getTabStyle = (numberOfTab = 1) =>
  StyleSheet.create({
    tab: {
      backgroundColor: 'white',
      height: 3,
      width: (Dimensions.get('window').width - 50) / numberOfTab,
      margin: 2,
    },
  });
// ({
//   tab: {
//     backgroundColor: 'white',
//     height: 1,
//     width: Dimensions.get('window').width / numberOfTab,
//     margin: 2,
//   },
// });

interface Props {
  modalVisible: boolean;
}

const RenderFoodTab: React.FC = () => {
  return (
    <View style={styles.tabContainer}>
      {subscribefoodNotesItem[0].foodNotes.map((item) => (
        <View
          key={item.note}
          style={getTabStyle(subscribefoodNotesItem[0].foodNotes.length).tab}
        />
      ))}
    </View>
  );
};

const FoodNoteContent: React.FC = () => {
  return (
    <SafeAreaView>
      <RenderFoodTab />
    </SafeAreaView>
  );
};

export default FoodNoteContent;
