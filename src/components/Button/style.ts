import styled from 'styled-components/native';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 5px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

// export const Icon = styled(Icon)``;
export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
