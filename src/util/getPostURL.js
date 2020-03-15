import Clipboard from '@react-native-community/clipboard';

export default async () => {
  const cliboardContent = await Clipboard.getString();

  if (!cliboardContent.includes('instagram')) return;

  return `${cliboardContent.split('?')[0]}?__a=1`;
};
