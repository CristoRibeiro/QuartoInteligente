import React, { useCallback } from 'react';
import { View } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const DashBoard: React.FC = () => {
  const { signOut } = useAuth();
  const handleSingOut = useCallback(() => {
    signOut();
  }, [signOut]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={handleSingOut}>Sair</Button>
    </View>
  );
};

export default DashBoard;
