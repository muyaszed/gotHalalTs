import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 142, 51, 0.678)',
  },
});

interface Props {
  modalVisible: boolean;
}

const GenericModal: React.FC<Props> = ({children, modalVisible}) => {
  return (
    <Modal animationType="slide" visible={modalVisible} transparent>
      <View style={styles.overlay}>{children}</View>
    </Modal>
  );
};

export default GenericModal;
