import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import BackgroundTimer from 'react-native-background-timer';

const SingIn: React.FC = () => {
  const [isConnected, setConnected] = useState(false);
  const [data, setData] = useState('');

  const log = useCallback(data => {
    console.log(data);
  }, []);

  const init = useCallback(async () => {
    await BluetoothSerial.requestEnable();

    const isEnabled = await BluetoothSerial.isEnabled();

    if (isEnabled) {
      const devices = await BluetoothSerial.list();
      console.log(devices);

      const device = await BluetoothSerial.connect('98:D3:B1:F3:1C:DF');
      console.log(device);

      const conectado = await BluetoothSerial.isConnected();
      setConnected(conectado);

      // if (isConnected) {

      BackgroundTimer.start();

      console.log('teste');
      BluetoothSerial.read((datareceive, subscription) => {
        setData(datareceive);
      }, '\r\n');
      // }
    }
  }, []);

  useEffect(() => {
    init();
  }, []);
  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
};

export default SingIn;
