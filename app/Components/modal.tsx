import React from 'react';
import {StyleSheet, View, Modal, ViewStyle} from 'react-native';
import {Text, Button} from '@codler/native-base';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 142, 51, 0.678)',
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
    padding: 20,
  },
  groupButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftButton: {
    width: 100,
    backgroundColor: '#098E33',
    borderColor: '#098E33',
  },
  leftBtnText: {
    color: '#f4f4f4',
  },
  rightButton: {
    width: 100,
    backgroundColor: '#098E33',
    borderColor: '#098E33',
  },
  rightBtnText: {
    color: '#f4f4f4',
  },
});

interface Props {
  title: string;
  leftButtonName?: string;
  rightButtonName: string;
  handleLeftButton?: () => void;
  handleRightButton: () => void;
  modalVisible: boolean;
  contentStyle?: ViewStyle;
}

const GenericModal: React.FC<Props> = ({
  title,
  children,
  leftButtonName,
  rightButtonName,
  handleLeftButton,
  handleRightButton,
  modalVisible,
  contentStyle,
}) => {
  return (
    <Modal animationType="slide" visible={modalVisible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={[styles.content, contentStyle]}>{children}</View>
          <View style={styles.groupButtonWrapper}>
            {leftButtonName ? (
              <Button
                style={styles.leftButton}
                iconLeft
                bordered
                block
                onPress={handleLeftButton}>
                <Text style={styles.leftBtnText}>{leftButtonName}</Text>
              </Button>
            ) : null}
            <Button
              style={styles.rightButton}
              iconLeft
              bordered
              block
              onPress={handleRightButton}>
              <Text style={styles.rightBtnText}>{rightButtonName}</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;
