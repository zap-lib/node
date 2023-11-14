<h1><img src="https://user-images.githubusercontent.com/6410412/282291415-aeae1885-b375-40b8-a727-bcd26b4f13e9.png" width="22px" height="22px" /> Zap</h1>

Zap implementation for Node.js.

Zap is a development library for building multi-device application that enable communication with other devices. While mobile devices offer a wide range of data sources, such as motion sensors, biometrics devices, microphones, touchscreens and more, traditional PCs like laptops and desktops are typically lack these resources.

The data sources available on mobile devices are valuable, but are often device-dependent, limiting their widespread use. To get over this limitation, Zap provides programming interface to access data sources on other devices. Imagine if PCs could use the series of data from the accelerometer sensor on a mobile device. A simple example is using smartphone as motion controller for PC.

<video src="https://user-images.githubusercontent.com/6410412/281803373-bd6b55e0-65cd-421a-9504-5df169d31c03.mp4" muted controls></video>

The main goal of Zap is to support mobile-PC communication, but it also extends its capabilities to enable mobile-mobile and PC-PC communication. Furthermore, it's not limited to PCs; any devices capable of running Zap implementations(e.g., Kiosk device, Smart TV, etc.) can also participate in this communication.

If you want to learn more about Zap, please read the documentation: https://zap-lib.github.io/

## Installation

```
$ npm install zap-lib-js
```

## Usage

```js
import { ZapServer } from 'zap-lib-js';

// Create and start a new Zap server to listen for data from clients.
(new class extends ZapServer {
  // Define the method that is called whenever accelerometer sensor data is
  // received from client devices.
  onAccelerometerChanged(info: MetaInfo, data: ZapAccelerometer) {
    console.log(`Data received from ${info.address}: (${data.x}, ${data.y}, ${data.z})`);
  }
}).listen();
```

For more use cases, please check the [Examples](https://github.com/zap-lib/examples).

## License

Zap is released under the [Apache License, Version 2.0](LICENSE).
