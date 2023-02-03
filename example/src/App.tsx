/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
// @ts-ignore
import RNEspBlufi, { useProvisioning } from '@kafudev/react-native-esp-blufi';
import { useEffect, useState } from 'react';

// connect to esp device through wifi
// first connect to the hotspot of the device and later
const devicePrefix = '';
// const devicePrefix = 'BLUFI'
const message = {
  scanBle: 'Searching device...',
  scanWifi: 'Searching available Wi-Fi...',
  connectDevice: 'Connecting your device...',
  sendingWifiCredential: 'Sending Wi-Fi credentials',
  confirmWifiConnection: 'Confirming Wi-Fi connection',
  enableBluetooth: 'Please enable the Bluetooth to start scan device.',
  enableLocation: 'Please grant location permission to start scan device.',
  scanBleFailed: 'Scan device failed, please try again.',
  connectFailed: 'Connect to device failed, please try again.',
  disconnected: 'device disconnected, please try again.',
  initSessionError: 'Reboot your device and retry.',
  applyError: 'Reset your device and retry.',
  completed: 'Device has been successfully provisioned!',
};

export default function App() {
  const [cDevice, setCDevice] = useState(null);

  const {
    bleDevices,
    wifiAPs,
    loading,
    status,
    currentStep,
    currentWifi,
    currentDevice,
    results,
    setCurrentStep,
    configWifi,
    connectDevice,
    connectWifiDevice, //newly added
    doProvisioning,
  } = useProvisioning({ devicePrefix, message, pop: null });

  useEffect(() => {
    // scanEspDevice();
    // // 检查授权
    // checkAuth().then((res) => {
    //   console.log('resBlu', resBlu)
    //   if (!resBlu) {
    //     $utils.toast.error('蓝牙打开失败')
    //     return false
    //   }
    //   connectToEspDevice()
    // })
  }, []);

  useEffect(() => {
    if (cDevice) {
      connectDeviceManual(cDevice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cDevice]);

  useEffect(() => {
    if (currentDevice) {
      console.log('currentDevice', currentDevice);
    }
  }, [currentDevice]);

  // 扫描蓝牙
  const scanEspDevice = async () => {
    try {
      const res = await RNEspBlufi.startBleScan(devicePrefix);
      console.log('startBleScan result:', res);
    } catch (err) {
      console.log('startBleScan error:', err);
    }
  };
  // 连接设备、扫描wifi
  const connectDeviceManual = async (_cDevice) => {
    await connectDevice(_cDevice);
    // await RNEspBlufi.startWifiScan()
  };

  const onToConnect = async () => {
    console.log(bleDevices);
    // {"deviceName": "BLUFI-0cb8152f7310", "serviceUuid": "0000ffff-0000-1000-8000-00805f9b34fb"} // 服务
    // {"deviceName": "BLUFI-0cb8152f7310", "serviceUuid": "00001801-0000-1000-8000-00805f9b34fb"} // 模块-手机
    // {"deviceName": "BLUFI-0cb8152f7310", "serviceUuid": "00001802-0000-1000-8000-00805f9b34fb"} // 手机-模块
    bleDevices.forEach((element) => {
      if (element) {
        if (element.deviceName.indexOf('BLUFI') >= 0) {
          // element.serviceUuid = '00001801-0000-1000-8000-00805f9b34fb';
          console.log(element);
          setCDevice(element);
          return;
        }
      }
    });
    setTimeout(() => {
      console.log(cDevice);
      if (cDevice) {
        console.log('currentDevice', currentDevice.current);
        // RNEspBlufi.startWifiScan();
      }
    }, 2000);
    return;
  };

  const onSetNetwork = async () => {
    console.log(cDevice);
    let wifi = {
      ssid: 'abc',
      password: 'abc123456',
    };
    doProvisioning(wifi);
    return;
  };
  return (
    // @ts-ignore
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Text>Result: {'xxx'}</Text>
      {/* @ts-ignore */}
      <Button onPress={scanEspDevice} title="扫描设备" />
      {/* @ts-ignore */}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ marginTop: 10 }} />
      {/* @ts-ignore */}
      <Button onPress={onToConnect} title="开始连接" />
      {/* @ts-ignore */}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ marginTop: 10 }} />
      {/* @ts-ignore */}
      <Button onPress={onSetNetwork} title="开始配网" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
