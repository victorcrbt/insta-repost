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

  async function clearNewPosts() {
    const onlyReposted = await getPostsFromStorage('reposted', true);

    Alert.alert(
      'Aviso',
      'Ao clicar em confirmar todos os posts que ainda não foram repostados serão apagados. Deseja continuar?',
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Confirmar',
          onPress: async () => {
            await AsyncStorage.setItem(
              '@repost:posts',
              JSON.stringify(onlyReposted)
            );
            setNewPosts([]);
          },
        },
      ]
    );
  }

  async function clearRepostedPosts() {
    const onlyNew = await getPostsFromStorage('reposted', false);

    Alert.alert(
      'Aviso',
      'Ao clicar em confirmar todos os posts que já foram repostados serão apagados. Deseja continuar?',
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Confirmar',
          onPress: async () => {
            await AsyncStorage.setItem(
              '@repost:posts',
              JSON.stringify(onlyNew)
            );
            setReposted([]);
          },
        },
      ]
    );
  }

  function handleDeleteNew(id) {
    Alert.alert('Aviso', 'Deseja realmente excluir esse post?', [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Confirmar',
        onPress: async () => {
          const newPostsCopy = newPosts;
          const postIndex = newPostsCopy.findIndex(post => post.id === id);
          newPostsCopy.splice(postIndex, 1);

          const dataInStorage = await getPostsFromStorage();
          const postInStorageIndex = dataInStorage.findIndex(
            post => post.id === id
          );
          dataInStorage.splice(postInStorageIndex, 1);

          await AsyncStorage.setItem(
            '@repost:posts',
            JSON.stringify(dataInStorage)
          );

          setNewPosts([...newPostsCopy]);
        },
      },
    ]);
  }

  function handleDeleteReposted(id) {
    Alert.alert('Aviso', 'Deseja realmente excluir esse post?', [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Confirmar',
        onPress: async () => {
          const repostedCopy = reposted;
          const postIndex = repostedCopy.findIndex(post => post.id === id);
          repostedCopy.splice(postIndex, 1);

          const dataInStorage = await getPostsFromStorage();
          const postInStorageIndex = dataInStorage.findIndex(
            post => post.id === id
          );
          dataInStorage.splice(postInStorageIndex, 1);

          await AsyncStorage.setItem(
            '@repost:posts',
            JSON.stringify(dataInStorage)
          );

          setReposted([...repostedCopy]);
        },
      },
    ]);
  }

  return (
    <Container>
      {newPosts.length > 0 && (
        <Section>
          <Header>
            <Title>Novos</Title>

            <ClearButton onPress={clearNewPosts}>
              <ClearButtonText>Limpar</ClearButtonText>
            </ClearButton>
          </Header>

          <Posts>
            {newPosts.map((post, index) => {
              return (
                <Post
                  handleDelete={() => handleDeleteNew(post.id)}
                  key={post.id}
                  data={post}
                  noBorder={newPosts.length - 1 === index}
                  onPress={() => navigation.navigate('Repost', { post })}
                />
              );
            })}
          </Posts>
        </Section>
      )}

      {newPosts.length > 0 && reposted.length > 0 && <Separator />}

      {reposted.length > 0 && (
        <Section>
          <Header>
            <Title>Repostados</Title>

            <ClearButton onPress={clearRepostedPosts}>
              <ClearButtonText>Limpar</ClearButtonText>
            </ClearButton>
          </Header>

          <Posts>
            {reposted.map((post, index) => {
              if (!post.reposted) return;

              return (
                <Post
                  handleDelete={() => handleDeleteReposted(post.id)}
                  key={post.id}
                  data={post}
                  noBorder={reposted.length - 1 === index}
                  onPress={() => navigation.navigate('Repost', { post })}
                />
              );
            })}
          </Posts>
        </Section>
      )}
    </Container>
  );
};

export default Home;
