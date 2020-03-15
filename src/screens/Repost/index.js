import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';

import PropTypes from 'prop-types';
import RNFetchBlob from 'rn-fetch-blob';

import {
  Container,
  VideoPlayer,
  Image,
  RepostButton,
  RepostButtonText,
} from './styles';

const Repost = ({ route, navigation }) => {
  const { post } = route.params;

  async function shareToInstagram() {
    const response = await RNFetchBlob.fetch(
      'GET',
      post.video_url || post.display_url
    ).progress((received, total) =>
      console.tron.log('download', received / total)
    );

    const base64 = response.base64();
    const type = post.video_url ? 'video/mp4' : 'image/jpeg';

    await Share.shareSingle({
      social: Share.Social.INSTAGRAM,
      url: `data:${type};base64,${base64}`,
      filename: 'foto',
      title: 'Share via',
      message: 'some message',
    });

    navigation.navigate('Home');
  }

  return (
    <Container>
      {post.video_url ? (
        <VideoPlayer source={{ uri: post.video_url }} />
      ) : (
        <Image
          source={{ uri: post.display_url }}
          accessibilityIgnoresInvertColors
        />
      )}

      <RepostButton onPress={shareToInstagram}>
        <RepostButtonText>Repostar</RepostButtonText>

        <Icon name="twitter-retweet" size={24} color="#fff" />
      </RepostButton>
    </Container>
  );
};

Repost.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      post: PropTypes.shape({
        id: PropTypes.string,
        display_url: PropTypes.string,
        video_url: PropTypes.string,
        video_duration: PropTypes.number,
        is_video: PropTypes.bool,
        caption: PropTypes.string,
        author: PropTypes.object,
        reposted: PropTypes.bool,
      }),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Repost;
