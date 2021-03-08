import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingIn from '../pages/SignIn';

const Auth = createStackNavigator();
const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Auth.Screen name="SingIn" component={SingIn} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
