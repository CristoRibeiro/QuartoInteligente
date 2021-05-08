import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
// import BluetoothSerial from 'react-native-bluetooth-serial';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Logo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgetPassword,
  ForgetPasswordText,
  CreateAccountButton,
  CreateAccountText,
  Form,
  SliderConfig,
} from './style';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface SignInDataForm {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [toggle, setToggle] = useState(true);
  const [discovering, setDiscovering] = useState(true);
  /*
  const discoverUnpaired = useCallback(() => {
    if (discovering) {
      return false;
    }
    setDiscovering(true);

    //  BluetoothSerial.discoverUnpairedDevices()
    //   .then((unpairedDevices) => {
    //     this.setState({ unpairedDevices, discovering: false })
    //   })
    //   .catch((err) => Toast.showShortBottom(err.message))
    //  }
  }, [discovering]);
*/
  const handleToggle = useCallback(() => {
    setToggle(!toggle);

    if (toggle) {
      // discoverUnpaired();
    }
  }, [toggle]);

  const handleSingIn = useCallback(
    async (data: SignInDataForm) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Usuário obrigatório!'),
          password: Yup.string().required('Senha obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
          return;
        }
        Alert.alert('Erro ao efetuar Login', 'Não foi possível realizar login');
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={Logo} />
            <View>
              <Title>Faça seu login</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSingIn}>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <SliderConfig
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#ff9000"
                maximumTrackTintColor="#ff9000"
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgetPassword onPress={() => console.log('deu2')}>
              <ForgetPasswordText>Esqueci minha senha</ForgetPasswordText>
            </ForgetPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SingUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar Conta</CreateAccountText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
