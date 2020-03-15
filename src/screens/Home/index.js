import React from 'react';

import Post from '~/components/Post';

import {
  Container,
  Separator,
  Section,
  Header,
  Title,
  ClearButton,
  ClearButtonText,
  Posts,
} from './styles';

const Home = () => {
  return (
    <Container>
      <Section>
        <Header>
          <Title>Novos</Title>

          <ClearButton>
            <ClearButtonText>Limpar</ClearButtonText>
          </ClearButton>
        </Header>

        <Posts>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post noBorder />
        </Posts>
      </Section>

      <Separator />

      <Section>
        <Header>
          <Title>Repostados</Title>

          <ClearButton>
            <ClearButtonText>Limpar</ClearButtonText>
          </ClearButton>
        </Header>

        <Posts>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post noBorder />
        </Posts>
      </Section>
    </Container>
  );
};

export default Home;
