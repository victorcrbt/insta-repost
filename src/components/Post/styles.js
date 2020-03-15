import Swipeable from 'react-native-gesture-handler/Swipeable';

import styled from 'styled-components/native';

export const Swipe = styled(Swipeable).attrs(props => ({
  containerStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: props.noBorder ? 0 : 1,
    marginBottom: 10,
    zIndex: 20,
    opacity: props.reposted ? 0.5 : 1,
  },
}))``;

export const TouchableHandler = styled.TouchableWithoutFeedback``;

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 10px;

  background: #fff;
`;

export const Preview = styled.Image`
  width: 100px;
  height: 100px;
`;

export const PostInfo = styled.View`
  flex: 1;
  padding: 0 5px;
`;

export const PostCaptionContainer = styled.View`
  flex: 1;
`;

export const PostCaption = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #999;
  font-size: 12px;
  text-align: justify;
`;

export const AuthorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AuthorAvatar = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 5px;

  border-radius: 12.5px;
`;

export const AuthorUsername = styled.Text`
  font-weight: bold;
`;
