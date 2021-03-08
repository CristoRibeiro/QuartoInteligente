import styled from 'styled-components/native';
import { Form as FormMobile } from '@unform/mobile';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 13px;
`;

export const ForgetPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgetPasswordText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #f4ede8;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  justify-content: center;
  align-items: center;
  background-color: #312e38;
  border-color: #232129;
  padding: 16px 0;
  flex-direction: row;
`;

export const CreateAccountText = styled.Text`
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  color: #ff9000;
  margin-left: 16px;
`;

export const Form = styled(FormMobile)`
  width: 100%;
`;
