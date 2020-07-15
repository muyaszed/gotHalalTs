import {Toast} from '@codler/native-base';

type toastPosition = 'top' | 'bottom' | 'center' | undefined;

interface showToastConfig {
  text: string;
  buttonText: string;
  position: toastPosition;
  duration: number;
}

export const showToast = (config: showToastConfig) => {
  Toast.show({
    text: config.text,
    buttonText: config.buttonText,
    position: config.position,
    duration: config.duration,
  });
};
