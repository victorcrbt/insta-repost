import AsyncStorage from '@react-native-community/async-storage';

export default async (key, value) => {
  const posts = await AsyncStorage.getItem('@repost:posts');

  if (!posts) return [];

  if (key !== undefined && value !== undefined) {
    const filtered = JSON.parse(posts).filter(post => post[key] === value);

    return filtered;
  }

  return JSON.parse(posts);
};
