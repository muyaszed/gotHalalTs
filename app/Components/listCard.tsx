import React, {ReactChild} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  Card,
  CardItem,
  Left,
  Thumbnail,
  Icon,
  Text,
  Body,
  Content,
} from '@codler/native-base';

const styles = StyleSheet.create({
  mainImageIcon: {
    fontSize: 150,
    width: '100%',
    textAlign: 'center',
  },
  avatarIcon: {fontSize: 50},
  image: {
    height: 200,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainText: {
    padding: 10,
  },
});

interface Props {
  name?: string;
  description?: string;
  onPress?: () => void;
  mainImage?: boolean;
  mainImageUri?: string | null;
  mainText?: string;
  avatar?: boolean;
  avatarUri?: string | null;
  footer?: boolean;
  footerChild?: ReactChild;
}

const ListCard: React.SFC<Props> = ({
  name,
  description,
  onPress,
  mainImage = true,
  mainImageUri,
  mainText,
  avatar = true,
  avatarUri,
  footer = true,
  footerChild,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}>
      <Card>
        <CardItem>
          <Left>
            {avatar ? (
              avatarUri ? (
                <Thumbnail
                  source={{
                    uri: avatarUri,
                  }}
                />
              ) : (
                <Icon type="Entypo" name="bowl" style={styles.avatarIcon} />
              )
            ) : null}

            <Body>
              <Text>{name}</Text>
              <Text note>{description}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody style={styles.contentContainer}>
          {mainImage ? (
            mainImageUri ? (
              <Image
                source={{
                  uri: mainImageUri,
                }}
                style={styles.image}
              />
            ) : (
              <Icon type="Entypo" name="bowl" style={styles.mainImageIcon} />
            )
          ) : (
            <Content style={styles.mainText}>
              {mainImageUri ? (
                <Image
                  source={{
                    uri: mainImageUri,
                  }}
                  style={styles.image}
                />
              ) : null}
              <Text>{mainText}</Text>
            </Content>
          )}
        </CardItem>
        {footer ? footerChild : null}
      </Card>
    </TouchableOpacity>
  );
};

export default ListCard;
