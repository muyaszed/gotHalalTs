import React from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Camera = () => {
  const ref: React.RefObject<RNCamera> = React.createRef();
  return (
    <View>
      <RNCamera
        ref={ref}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
      />
    </View>
  );
};

export default Camera;
