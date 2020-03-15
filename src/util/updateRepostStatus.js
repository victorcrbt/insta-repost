import AsyncStorage from '@react-native-community/async-storage';

export default async postId => {
  const posts = await AsyncStorage.getItem('@repost:posts');

  if (!posts) return;

  const postsCopy = JSON.parse(posts);
  const postIndex = postsCopy.findIndex(
    post => post.id.toString() === postId.toString()
  );

  postsCopy[postIndex].reposted = true;

  await AsyncStorage.setItem('@repost:posts', JSON.stringify(postsCopy));
};
