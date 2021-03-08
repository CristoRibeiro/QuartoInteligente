import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthData {
  token: string;
  user: object;
}
interface SignInProviderData {
  email: string;
  password: string;
}
interface ProviderData {
  user: object;
  signIn(data: SignInProviderData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<ProviderData>({} as ProviderData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>({} as AuthData);

  useEffect(() => {
    async function loadAuth() {
      const [token, user] = await AsyncStorage.multiGet([
        '@BabaEletronicaCristo:token',
        '@BabaEletronicaCristo:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }
    loadAuth();
  }, []);

  const signIn = useCallback(
    async ({ email, password }: SignInProviderData) => {
      const response = await api.post('sessions', {
        password,
        email,
      });

      const { token, userDTO } = response.data;

      await AsyncStorage.multiSet([
        ['@BabaEletronicaCristo:token', token],
        ['@BabaEletronicaCristo:user', JSON.stringify(userDTO)],
      ]);

      setData({ token, user: userDTO });
    },
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@BabaEletronicaCristo:token',
      '@BabaEletronicaCristo:user',
    ]);
    setData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): ProviderData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('The AuthProvider need be used around your tags');
  }
  return context;
}
