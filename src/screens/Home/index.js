import React, { useEffect, useState } from 'react';
import { AppState, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';

import axios from 'axios';

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

const Home = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function checkClipboard() {
      if (AppState.currentState !== 'active') return;
      if (!isFocused) return;

      const dataInStorage = JSON.parse(
        await AsyncStorage.getItem('@repost:posts')
      );

      console.tron.log(dataInStorage);

      setTimeout(async () => {
        const cliboardContent = await Clipboard.getString();

        if (!cliboardContent.includes('instagram')) return;

        console.tron.log(cliboardContent.split('?')[0]);

        try {
          const response = await axios.get(
            `${cliboardContent.split('?')[0]}?__a=1`
          );

          const {
            id,
            display_url,
            video_url,
            video_duration,
            is_video,
            edge_media_to_caption,
            owner,
          } = response.data.graphql.shortcode_media;

          if (video_duration && video_duration > 60.0)
            return Alert.alert(
              'Falha na importação',
              'A duração máxima do vídeo é 1 minuto.'
            );

          const post = {
            id,
            display_url,
            video_url,
            is_video,
            caption: edge_media_to_caption.edges[0]?.node.text,
            author: owner,
            reposted: false,
          };

          if (dataInStorage && dataInStorage.some(post => post.id === id))
            return;

          setPosts([...posts, post]);

          await AsyncStorage.setItem(
            '@repost:posts',
            JSON.stringify(dataInStorage ? [...dataInStorage, post] : [post])
          );
        } catch (err) {
          if (err.response?.status === 404) {
            Alert.alert(
              'Falha',
              'No momento não é possível repostar mídia de perfis privados.'
            );
          }
        }
      }, 500);
    }

    AppState.addEventListener('change', checkClipboard);

    return () => AppState.removeEventListener('change', checkClipboard);
  }, [isFocused, posts]);

  useEffect(() => {
    async function fetchFromAsyncStorage() {
      const dataInStorage = await AsyncStorage.getItem('@repost:posts');

      if (!dataInStorage) return;

      setPosts(JSON.parse(dataInStorage));
    }

    fetchFromAsyncStorage();
  }, []);

  return (
    <Container>
      <Section>
        <Header>
          {/* <Title>Novos</Title> */}

          <ClearButton
            onPress={async () => AsyncStorage.removeItem('@repost:posts')}
          >
            <ClearButtonText>Limpar</ClearButtonText>
          </ClearButton>
        </Header>

        <Posts>
          {posts.length > 0 &&
            posts.map((post, index) => (
              <Post
                key={post.id}
                data={post}
                noBorder={posts.length - 1 === index}
                onPress={() => navigation.navigate('Repost', { post })}
              />
            ))}
        </Posts>
      </Section>

      {/* <Separator /> */}

      {/* <Section>
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
      </Section> */}
    </Container>
  );
};

export default Home;
