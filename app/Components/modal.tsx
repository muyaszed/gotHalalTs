import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Text, Button} from '@codler/native-base';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    backgroundColor: 'white',
    minHeight: 150,
    padding: 20,
    borderRadius: 5,
  },
  titleWrapper: {},
  title: {},
  content: {
    minHeight: 50,
  },
  groupButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftButton: {
    width: 100,
  },
  rightButton: {
    width: 100,
  },
});

interface Props {
  title: string;
  leftButtonName: string;
  rightButtonName: string;
  handleLeftButton: () => void;
  handleRightButton: () => void;
  modalVisible: boolean;
}

const GenericModal: React.FC<Props> = ({
  title,
  children,
  leftButtonName,
  rightButtonName,
  handleLeftButton,
  handleRightButton,
  modalVisible,
}) => {
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.content}>{children}</View>
          <View style={styles.groupButtonWrapper}>
            <Button
              style={styles.leftButton}
              iconLeft
              bordered
              block
              onPress={handleLeftButton}>
              <Text>{leftButtonName}</Text>
            </Button>
            <Button
              style={styles.rightButton}
              iconLeft
              bordered
              block
              onPress={handleRightButton}>
              <Text>{rightButtonName}</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;
