import Video from 'react-native-video';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
`;

export const VideoPlayer = styled(Video).attrs({
  paused: true,
  controls: true,
  repeat: true,
  disableFocus: false,
})`
  width: 100%;

  aspect-ratio: 1;
`;

export const Image = styled.Image`
  width: 100%;

  aspect-ratio: 1;
`;

export const RepostButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 10px;

  background: #1579c1;
  border-radius: 5px;
`;

export const RepostButtonText = styled.Text`
  margin-right: 5px;

  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
