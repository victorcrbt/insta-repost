import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

const DeleteButton = props => {
  return (
    <Container {...props}>
      <Icon name="delete" size={24} color="#fff" />
    </Container>
  );
};

export default DeleteButton;
