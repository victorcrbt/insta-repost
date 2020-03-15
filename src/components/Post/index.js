import React from 'react';

import PropTypes from 'prop-types';

import DeleteButton from '~/components/DeleteButton';

import {
  Swipe,
  TouchableHandler,
  Container,
  Preview,
  PostInfo,
  PostCaptionContainer,
  PostCaption,
  AuthorContainer,
  AuthorAvatar,
  AuthorUsername,
} from './styles';

const Post = ({ noBorder, onPress, data }) => {
  function handleDelete() {}

  return (
    <Swipe
      reposted={data.reposted}
      friction={1}
      renderRightActions={() => <DeleteButton onPress={handleDelete} />}
      noBorder={noBorder}
    >
      <TouchableHandler onPress={!data.reposted ? onPress : () => {}}>
        <Container>
          <Preview
            source={{
              uri: data.display_url,
            }}
          />

          <PostInfo>
            <PostCaptionContainer>
              <PostCaption>{data.caption}</PostCaption>
            </PostCaptionContainer>

            <AuthorContainer>
              <AuthorAvatar source={{ uri: data.author.profile_pic_url }} />
              <AuthorUsername>{data.author.username}</AuthorUsername>
            </AuthorContainer>
          </PostInfo>
        </Container>
      </TouchableHandler>
    </Swipe>
  );
};

Post.propTypes = {
  noBorder: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    display_url: PropTypes.string,
    video_url: PropTypes.string,
    video_duration: PropTypes.number,
    is_video: PropTypes.bool,
    caption: PropTypes.string,
    author: PropTypes.object,
    reposted: PropTypes.bool,
  }).isRequired,
};

Post.defaultProps = {
  noBorder: false,
};

export default Post;
