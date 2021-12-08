import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button} from '@codler/native-base';
import Overlay from '../Generic/overlay';
import FoodNoteContent from './FoodNoteContent';

// const styles = StyleSheet.create({
// });

interface Props {
  modalVisible: boolean;
}

const FoodNoteModal: React.FC<Props> = ({modalVisible}) => {
  return (
    <Overlay modalVisible={modalVisible}>
      <FoodNoteContent />
    </Overlay>
  );
};

export default FoodNoteModal;
