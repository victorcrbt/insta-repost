import React, { useEffect, useState } from 'react';
import { AppState, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import getPostsFromStorage from '~/util/getPostsFromStorage';
import getPostURL from '~/util/getPostURL';
import fetchPostDetails from '~/util/fetchPostDetails';

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

  const [newPosts, setNewPosts] = useState([]);
  const [reposted, setReposted] = useState([]);

  useEffect(() => {
    async function checkClipboard(appState) {
      if (appState !== 'active') return;
      if (!isFocused) return;

      const dataInStorage = await getPostsFromStorage();

      const postURL = await getPostURL();

      try {
        const postDetails = await fetchPostDetails(postURL);

        if (
          dataInStorage &&
          dataInStorage.some(post => post.id === postDetails.id)
        )
          return;

        await AsyncStorage.setItem(
          '@repost:posts',
          JSON.stringify(
            dataInStorage ? [...dataInStorage, postDetails] : [postDetails]
          )
        );

        const onlyNewPosts = dataInStorage
          ? dataInStorage.filter(post => post.reposted === false)
          : [];

        setNewPosts([...onlyNewPosts, postDetails]);
      } catch (err) {
        if (err.response?.status === 404) {
          Alert.alert(
            'Falha',
            'No momento não é possível repostar mídia de perfis privados.'
          );
        }
      }
    }

    AppState.addEventListener('change', checkClipboard);

    return () => AppState.removeEventListener('change', checkClipboard);
  }, [newPosts]);

  useEffect(() => {
    if (!isFocused) return;

    async function fetchFromAsyncStorage() {
      const newPosts = await getPostsFromStorage('reposted', false);
      const repostedPosts = await getPostsFromStorage('reposted', true);

      setNewPosts(newPosts);
      setReposted(repostedPosts);
    }

    fetchFromAsyncStorage();
  }, [isFocused]);

  return (
    <Container>
      <Section>
        <Header>
          <Title>Novos</Title>

          <ClearButton
            onPress={async () => AsyncStorage.removeItem('@repost:posts')}
          >
            <ClearButtonText>Limpar</ClearButtonText>
          </ClearButton>
        </Header>

        <Posts>
          {newPosts.length > 0 &&
            newPosts.map((post, index) => {
              return (
                <Post
                  key={post.id}
                  data={post}
                  noBorder={newPosts.length - 1 === index}
                  onPress={() => navigation.navigate('Repost', { post })}
                />
              );
            })}
        </Posts>
      </Section>

      <Separator />

      <Section>
        <Header>
          <Title>Repostados</Title>

          <ClearButton
            onPress={async () => AsyncStorage.removeItem('@repost:posts')}
          >
            <ClearButtonText>Limpar</ClearButtonText>
          </ClearButton>
        </Header>

        <Posts>
          {reposted.length > 0 &&
            reposted.map((post, index) => {
              if (!post.reposted) return;

              return (
                <Post
                  key={post.id}
                  data={post}
                  noBorder={reposted.length - 1 === index}
                  onPress={() => navigation.navigate('Repost', { post })}
                />
              );
            })}
        </Posts>
      </Section>
    </Container>
  );
};

export default Home;
