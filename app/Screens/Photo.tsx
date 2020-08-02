import React from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Modal from '../Components/modal';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {updateUserProfile} from '../Profile/action';
import {Dispatch} from 'redux';
import RNFS from 'react-native-fs';

const handleSelectPhoto = (
  userToken: string,
  selectedPhoto: FormData,
  currentUserId: number,
  dispatch: Dispatch<any>,
) => {
  const userData = {
    avatar: selectedPhoto,
  };
  dispatch(updateUserProfile(userToken, userData, currentUserId));
};

const convertPhotoToBase64 = async (uri: string) => {
  let imagePATH = '';
  let photoPATH = '';
  let regex = /:\/\/(.{36})\//i;
  let result = uri.match(regex);
  if (result) {
    photoPATH = `assets-library://asset/asset.JPG?id=${result[1]}&ext=JPG`;
  }

  const dest = `${RNFS.TemporaryDirectoryPath}${Math.random()
    .toString(36)
    .substring(7)}.jpg`;

  imagePATH = await RNFS.copyAssetsFileIOS(
    photoPATH,
    dest,
    500,
    500,
    1.0,
    1.0,
    'contain',
  );

  const photoBase64 = await RNFS.readFile(imagePATH, 'base64');
  return photoBase64;
};

const Photo = () => {
  const [allphoto, setAllPhoto] = React.useState([]);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [selectedPhoto, setSelectedPhoto] = React.useState('');
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const currentUserId = useSelector((state: RootState) => state.profile.userId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then((photo) => setAllPhoto(photo.edges))
      .catch((err) => console.log('Error loading image' + err));
  }, []);

  return (
    <View>
      <ScrollView>
        {allphoto.map((photo, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                const convertedUri = await convertPhotoToBase64(
                  photo.node.image.uri,
                );
                const data = new FormData();
                data.append('avatar', {
                  name: photo.node.image.filename,
                  type: photo.node.type,
                  uri: photo.node.image.uri,
                });
                debugger;
                setConfirmModal(true);
                setSelectedPhoto(data);
              }}>
              <Image
                style={{width: 150, height: 150}}
                source={{uri: photo.node.image.uri}}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Modal
        title="Are you sure you wan to proceed with this picture?"
        leftButtonName="Cancel"
        rightButtonName="OK"
        modalVisible={confirmModal}
        handleLeftButton={() => {
          setConfirmModal(false);
        }}
        handleRightButton={() => {
          if (userToken && currentUserId) {
            handleSelectPhoto(
              userToken,
              selectedPhoto,
              currentUserId,
              dispatch,
            );
          }
        }}
      />
    </View>
  );
};

export default Photo;
