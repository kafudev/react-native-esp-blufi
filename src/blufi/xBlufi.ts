// @ts-ignore
import { factory } from './other/onfire';

let mOnFire: any = null;

// 0=ReactNative  1表示微信小程序 2表示阿里支付宝小程序
const XMQTT_SYSTEM = {
  ReactNative: 0,
  WeChat: 1,
  Alipay: 2,
};

const XBLUFI_TYPE = {
  TYPE_STATUS_CONNECTED: '-2', /// 设备连接状态回调
  TYPE_CLOSE_CONNECTED: '-1', ///主动关闭连接
  TYPE_CONNECTED: '0', //主动连接
  TYPE_GET_DEVICE_LISTS: '1', //发现设备列表回调
  TYPE_INIT_ESP32_RESULT: '2',
  TYPE_RECIEVE_CUSTON_DATA: '3', //接收到自定义数据
  TYPE_CONNECT_ROUTER_RESULT: '4',
  TYPE_CONNECT_NEAR_ROUTER_LISTS: '5',
  TYPE_GET_DEVICE_LISTS_START: ' 41', //发现设备列表回调开始
  TYPE_GET_DEVICE_LISTS_STOP: '42', //停止发现设备列表回调
  TYPE_GET_DEVICE_VERSION: '45', //获取设备版本
  TYPE_GET_DEVICE_STATE: '46', //获取设备状态
};

const OnFireEvent = {
  EVENT_START_DISCONORY: '0', //蓝牙状态事件 发现设备
  EVENT_CONNECT_DISCONNECT: '1', //通知连接或断开蓝牙
  EVENT_NOFITY_INIT_ESP32: '3', //通知获取蓝牙设备的服务uuid列表等初始化工作
  ENENT_ALL: '6',
  EVENT_NOFITY_SEND_ROUTER_SSID_PASSWORD: '50', //通知发送路由器的ssid和password
  EVENT_NOFITY_SEND_CUSTON_DATA: '51', //通知发送自定义数据
  EVENT_NOFITY_SEND_GET_ROUTER_SSID: '52', //获取周围的SSID
  EVENT_NOFITY_SEND_GET_STATE: '60', //获取wifi状态
  EVENT_NOFITY_SEND_GET_VERSION: '80', //获取版本
};

/**
 * 初始化
 * @param type 参考 XMQTT_SYSTEM
 */
function initXBlufi(type: number = 0, options: any): void {
  mOnFire = factory();
  switch (type) {
    case XMQTT_SYSTEM.ReactNative:
      let $rnBlufiImpl = require('./xBlufi-rn-impl.js');
      $rnBlufiImpl.init(options);
      break;
    case XMQTT_SYSTEM.WeChat:
      let $wxBlufiImpl = require('./xBlufi-wx-impl.js');
      $wxBlufiImpl.init(options);
      break;
    case XMQTT_SYSTEM.Alipay:
      break;
  }
}

function notifyDeviceMsgEvent(options: any): void {
  mOnFire.fire(OnFireEvent.ENENT_ALL, options);
}

function listenDeviceMsgEvent(isSetListener: boolean, funtion: Function): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.ENENT_ALL, funtion);
  } else {
    mOnFire.un(funtion);
  }
}

/**
 * 开始或停止发现附近的蓝牙设备
 * @param options 连接参数 {"isStart":true , "filter":"名字过滤"} :是否开始发现设备
 */
function notifyStartDiscoverBle(options: any): void {
  mOnFire.fire(OnFireEvent.EVENT_START_DISCONORY, options);
}

/**
 * 开始或停止发现附近的蓝牙设备
 * @param options 连接参数 {"isStart":true} 是否开始发现设备
 */
function listenStartDiscoverBle(
  isSetListener: boolean,
  funtion: Function
): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.EVENT_START_DISCONORY, funtion);
  } else {
    mOnFire.un(funtion);
  }
}

/**
 * 连接或断开 蓝牙连接
 *
 * @param options 连接参数 {"connect":true,"deviceID":"设备id，蓝牙发现列表获取"}
 */
function notifyConnectBle(options: any): void {
  console.log('notifyConnectBle 蓝牙准备连接的deviceId --------------');
  mOnFire.fire(OnFireEvent.EVENT_CONNECT_DISCONNECT, options);
}

/**
 * 开始或停止连接的蓝牙设备
 * @param options 连接参数 {"isStart":true} 是否开始发现设备
 */
function listenConnectBle(isSetListener: boolean, funtion: Function): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.EVENT_CONNECT_DISCONNECT, funtion);
  } else {
    mOnFire.un(funtion);
  }
}

/**
 * 通知初始化获取设备的服务列表等信息
 * @param options 连接参数 {"deviceId":"设备的设备id"}
 */
function notifyInitBleEsp32(options: any): void {
  mOnFire.fire(OnFireEvent.EVENT_NOFITY_INIT_ESP32, options);
}

/**
 * 通知初始化获取设备的服务列表等信息
 * @param options 连接参数 {"isStart":true} 是否开始发现设备
 */
function listenInitBleEsp32(isSetListener: boolean, funtion: Function): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.EVENT_NOFITY_INIT_ESP32, funtion);
  } else {
    mOnFire.un(funtion);
  }
}

/**
 * 发送获取版本通知
 */
function notifySendGetVersion(): void {
  mOnFire.fire(OnFireEvent.EVENT_NOFITY_SEND_GET_VERSION);
}
/** 发送获取版本监听
 * @param isSetListener 是否设置监听
 */
function listenSendGetVersion(isSetListener: boolean, funtion: Function): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.EVENT_NOFITY_SEND_GET_VERSION, funtion);
  } else {
    mOnFire.un(funtion);
  }
}

/**
 * 发送获取ssid状态通知
 */
function notifySendGetState(): void {
  mOnFire.fire(OnFireEvent.EVENT_NOFITY_SEND_GET_STATE);
}
/** 发送获取ssid状态监听
 * @param isSetListener 是否设置监听
 */
function listenSendGetState(isSetListener: boolean, funtion: Function): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.EVENT_NOFITY_SEND_GET_STATE, funtion);
  } else {
    mOnFire.un(funtion);
  }
}

/**
 * 发送获取附近路由器SSID列表的通知
 */
function notifySendGetNearRouterSsid(): void {
  mOnFire.fire(OnFireEvent.EVENT_NOFITY_SEND_GET_ROUTER_SSID);
}
/** 发送获取附近路由器SSID列表的监听
 * @param isSetListener 是否设置监听
 */
function listenSendGetNearRouterSsid(
  isSetListener: boolean,
  funtion: Function
): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.EVENT_NOFITY_SEND_GET_ROUTER_SSID, funtion);
  } else {
    mOnFire.un(funtion);
  }
}

/**
 * 发送路由器SSID和密码的通知
 * @param options 连接参数 {"ssid":"xxx","password":"xxx"}
 */
function notifySendRouterSsidAndPassword(options: any): void {
  mOnFire.fire(OnFireEvent.EVENT_NOFITY_SEND_ROUTER_SSID_PASSWORD, options);
}
/**
 * 发送路由器SSID和密码的监听
 */
function listenSendRouterSsidAndPassword(
  isSetListener: boolean,
  funtion: Function
): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.EVENT_NOFITY_SEND_ROUTER_SSID_PASSWORD, funtion);
  } else {
    mOnFire.un(funtion);
  }
}
/**
 * 发送自定义数据的通知
 * @param options 自定义数据
 */
function notifySendCustomData(options: any): void {
  mOnFire.fire(OnFireEvent.EVENT_NOFITY_SEND_CUSTON_DATA, options);
}
/**
 * 发送自定义数据的监听
 */
function listenSendCustomData(isSetListener: boolean, funtion: Function): void {
  if (isSetListener) {
    mOnFire.on(OnFireEvent.EVENT_NOFITY_SEND_CUSTON_DATA, funtion);
  } else {
    mOnFire.un(funtion);
  }
}
export {
  XMQTT_SYSTEM,
  XBLUFI_TYPE,
  OnFireEvent,
  initXBlufi,
  notifyDeviceMsgEvent,
  listenDeviceMsgEvent,
  notifyStartDiscoverBle,
  listenStartDiscoverBle,
  notifyConnectBle,
  listenConnectBle,
  notifyInitBleEsp32,
  listenInitBleEsp32,
  notifySendGetVersion,
  listenSendGetVersion,
  notifySendGetState,
  listenSendGetState,
  notifySendGetNearRouterSsid,
  listenSendGetNearRouterSsid,
  notifySendRouterSsidAndPassword,
  listenSendRouterSsidAndPassword,
  notifySendCustomData,
  listenSendCustomData,
};

export default {
  XMQTT_SYSTEM,
  XBLUFI_TYPE,
  OnFireEvent,
  initXBlufi,
  notifyDeviceMsgEvent,
  listenDeviceMsgEvent,
  notifyStartDiscoverBle,
  listenStartDiscoverBle,
  notifyConnectBle,
  listenConnectBle,
  notifyInitBleEsp32,
  listenInitBleEsp32,
  notifySendGetVersion,
  listenSendGetVersion,
  notifySendGetState,
  listenSendGetState,
  notifySendGetNearRouterSsid,
  listenSendGetNearRouterSsid,
  notifySendRouterSsidAndPassword,
  listenSendRouterSsidAndPassword,
  notifySendCustomData,
  listenSendCustomData,
};
