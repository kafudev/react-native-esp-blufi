# @kafudev/react-native-esp-blufi 库使用手册

## 安装

使用 npm 或 yarn 安装库：

```shell
npm install @kafudev/react-native-esp-blufi
```

或者

```shell
yarn add @kafudev/react-native-esp-blufi
```

此外，该库依赖于另一个名为 `react-native-ble-manager` 的库来提供蓝牙功能。请使用以下命令安装它：

```shell
npm install react-native-ble-manager
```

或者

```shell
yarn add react-native-ble-manager
```

## 使用方法

从 `react` 和 `react-native` 导入必要的组件，以及导入库本身：

```jsx
import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView, TextInput } from 'react-native';
import xBlufi from '@kafudev/react-native-esp-blufi';
```

创建一个函数式组件来实现你的应用：

```jsx
const App = () => {
  // 在这里定义你的状态变量
  const [devicesList, setDevicesList] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  // ...

  // 使用 useEffect 钩子来初始化库并监听设备消息
  useEffect(() => {
    xBlufi.initXBlufi(2);
    console.log('xBlufi', xBlufi.XMQTT_SYSTEM);
    xBlufi.listenDeviceMsgEvent(true, funListenDeviceMsgEvent);

    return () => {
      xBlufi.listenDeviceMsgEvent(false, funListenDeviceMsgEvent);
    };
  }, []);

  // 在这里定义事件处理函数
  const search = async () => {
    // ...
  };

  const connect = async (deviceId: string) => {
    // ...
  };

  const disconnect = (_deviceId?: string) => {
    // ...
  };

  const funListenDeviceMsgEvent = (options: {
    type: any;
    result: any;
    data: any;
  }) => {
    // ...
  };

  // 在这里定义其他应用逻辑的函数
  function initEsp32(): void {
    // ...
  }

  // 获取版本
  function getVersion(): void {
    // ...
  }

  // 获取状态
  function getState(): void {
    // ...
  }

  function scanNetworks(): void {
    // ...
  }

  function sendWifiConfig(ssid: string, password: string): void {
    // ...
  }

  function provCustom(): void {
    // ...
  }

  function provCustomWithByteData(): void {
    // ...
  }

  // 渲染UI组件并绑定事件处理函数
  return (
    <ScrollView style={{ flex: 1, padding: 10, alignContent: 'center' }}>
      {/* 在这里编写 UI 组件和事件处理函数 */}
    </ScrollView>
  );
};

export default App;
```

注意：请替换上述代码中的注释部分为你自己的逻辑和 UI 组件。

要完全了解每个函数的目的和使用方法，请参考提供的代码示例中的内联注释。

## API

以下是 @kafudev/react-native-esp-blufi 库的可用 API：

| 方法名                                 | 描述                                        |
| -------------------------------------- | ------------------------------------------- |
| `initXBlufi(num: number)`              | 初始化 xBlufi，参数为数字类型,0=ReactNative |
| `listenDeviceMsgEvent(...)`            | 监听设备消息事件                            |
| `notifyStartDiscoverBle(...)`          | 通知开始或停止蓝牙设备搜索                  |
| `notifyConnectBle(...)`                | 通知连接或断开蓝牙设备                      |
| `notifyInitBleEsp32(...)`              | 通知初始化蓝牙设备 ESP32                    |
| `notifySendGetNearRouterSsid(...)`     | 通知发送获取附近路由器 SSID 的命令          |
| `notifySendRouterSsidAndPassword(...)` | 通知发送 WiFi 配置（SSID 和密码）           |
| `notifySendCustomData(...)`            | 通知发送自定义数据到设备                    |

请根据需要参考库的文档，使用适当的 API 来实现你的应用需求。


## 注意事项

请注意，在使用任何蓝牙功能之前，您需要调用 `BleManager.start()` 来初始化 `react-native-ble-manager`。

感谢提供的信息！以下是基于 `https://github.com/xuhongv/BlufiEsp32WeChat` 开源项目的 @kafudev/react-native-esp-blufi 库的使用说明。

## 致谢

特别致谢 `https://github.com/xuhongv/BlufiEsp32WeChat` 提供的开源项目，为 @kafudev/react-native-esp-blufi 库提供了灵感和参考。

在编写您自己的应用程序时，可以借鉴 `https://github.com/xuhongv/BlufiEsp32WeChat` 的相关逻辑和功能，并根据需要进行修改和调整。
