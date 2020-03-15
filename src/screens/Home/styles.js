import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;

  background: #fff;
`;

export const Separator = styled.View`
  height: 1px;
  margin: 20px 0 30px;

  background: #ccc;
`;

export const Section = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const ClearButton = styled.TouchableOpacity`
  padding: 3px 10px;

  background: #ddd;
  border-radius: 4px;
`;

export const ClearButtonText = styled.Text`
  font-weight: bold;
`;

export const Posts = styled.View``;
