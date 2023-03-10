# react-native-esp-blufi

ReactNative Provisioning application for esp-blufi Unified provisioning

## Installation

```sh
npm install @kafudev/react-native-esp-blufi
```

## Note
This package is based on [react-native-esp-blufi](https://www.npmjs.com/package/react-native-esp-blufi)
This package is based on [react-native-esp-blufi](https://www.npmjs.com/package/react-native-esp-blufi)

with the above package without connecting to bluetooth one cannot connect to wifi of esp device, to slove that issue made neccessary changes to the code .
Now one can connect to esp device wifi without connecting to bluetooth.

Supports Both Android and IOS


## Usage

```js
import RNEspBlufi, {useProvisioning} from "@kafudev/react-native-esp-blufi";

// ...

// connect to esp device through wifi
// first connect to the hotspot of the device and later
const devicePrefix = 'PROV_'
	const message: MessageInfo = {
		scanBle: 'Searching device...',
		scanWifi: 'Searching available Wi-Fi...',
		connectDevice: 'Connecting your device...',
		sendingWifiCredential: 'Sending Wi-Fi credentials',
		confirmWifiConnection: 'Confirming Wi-Fi connection',
		enableBluetooth: 'Please enable the Bluetooth to start scan device.',
		enableLocation:
			'Please grant location permission to start scan device.',
		scanBleFailed: 'Scan device failed, please try again.',
		connectFailed: 'Connect to device failed, please try again.',
		disconnected: 'device disconnected, please try again.',
		initSessionError: 'Reboot your device and retry.',
		applyError: 'Reset your device and retry.',
		completed: 'Device has been successfully provisioned!',
	}
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
	} = useProvisioning({ devicePrefix, message, pop: 'abcd1234' })



// android example
const connectToEspDevice = async()=>{
    try{
        const result = await RNEspBlufi.connectWifiDevice("pop"); //proof of possession

    }
    catch(err){
        console.log(err)

    }
}


// ios example
const connectToEspDevice = async()=>{
	try{
		let pop = ""
		let SSID =""
		let Password=""
		const result = await RNEspBlufi.connectWifiDevice(SSID,POP,Password)

	}
	catch(err){
		console.log(err)
	}
}



```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
