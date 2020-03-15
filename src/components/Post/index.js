import React from 'react';

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

const Post = ({ noBorder, handleDelete }) => {
  return (
    <Swipe
      friction={1}
      renderRightActions={() => <DeleteButton onPress={handleDelete} />}
      noBorder={noBorder}
    >
      <TouchableHandler onPress={() => console.tron.log('clicado')}>
        <Container>
          <Preview
            source={{
              uri:
                'https://instagram.fpoa35-1.fna.fbcdn.net/v/t51.2885-15/e35/90027493_1563560460434976_2490696035425728349_n.jpg?_nc_ht=instagram.fpoa35-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=SsGWwReLFccAX_IpLzh&oh=f7e09f8fd4b31882f1f93a05f8235bdd&oe=5E9B1181',
            }}
          />

          <PostInfo>
            <PostCaptionContainer>
              <PostCaption>
                My mom said i can be anything i want so shut up. I know i dont
                look like one but my dream is to be a northern cardinal
              </PostCaption>
            </PostCaptionContainer>

            <AuthorContainer>
              <AuthorAvatar
                source={{
                  uri:
                    'https://instagram.fpoa35-1.fna.fbcdn.net/v/t51.2885-19/s150x150/88377910_229584331549679_3359518514078547968_n.jpg?_nc_ht=instagram.fpoa35-1.fna.fbcdn.net&_nc_ohc=QDPEbVRAAqcAX_TZ_TD&oh=e6e22015a387d8b5df86b336f00d643b&oe=5E9D4F90',
                }}
              />
              <AuthorUsername>sinful.cats</AuthorUsername>
            </AuthorContainer>
          </PostInfo>
        </Container>
      </TouchableHandler>
    </Swipe>
  );
};

export default Post;
