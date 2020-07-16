import Toast from 'react-native-simple-toast';

export interface ShowToastConfig {
  text: string;
}

export const showToast = (text: string) => {
  Toast.show(text);
};
