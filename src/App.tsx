import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  OneSignal.setAppId('825d130e-5171-4ca1-aec0-d2988984bef0');

  OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notifReceivedEvent,
    );
    const notif = notifReceivedEvent.getNotification();
    setTimeout(() => notifReceivedEvent.complete(notif), 0);
  });

  OneSignal.setInAppMessageClickHandler(event => {
    console.log('OneSignal IAM clicked:', event);
  });

  OneSignal.setNotificationOpenedHandler(openedEvent => {
    console.log('OneSignal: notification opened:', openedEvent);
    const { action, notification } = openedEvent;
  });

  OneSignal.addPermissionObserver(event => {
    console.log('OneSignal: permission changed:', event);
  });

  OneSignal.addSubscriptionObserver(event => {
    console.log('OneSignal: subscription changed:', event);
  });

  OneSignal.addEmailSubscriptionObserver(event => {
    console.log('OneSignal: email subscription changed: ', event);
  });

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
