# WebUSB ♥ Arduino

A little demo with WebUSB and Arduino.

## Prepare your environment

1. Make sure you are running the [latest dev-channel release of Google Chrome](https://www.google.com/chrome/browser/desktop/index.html?extra=devchannel).

2. Make sure the "Experimental Web Platform Features" flag is enabled in chrome://flags/#enable-experimental-web-platform-features.

3. Install at least version 1.6.11 of the [Arduino IDE](https://www.arduino.cc/en/Main/Software).

4. The WebUSB library provides all the extra low-level USB code necessary for WebUSB support except for one thing: Your device must be upgraded from USB 2.0 to USB 2.1.

USB 2.1 is required so that the host knows that the device exposes a Binary Object Store descriptor, which is where the WebUSB descriptor (and Microsoft OS Descriptor 2.0) reading sequence starts.

To do this go into the SDK installation directory and open `hardware/arduino/avr/cores/arduino/USBCore.h`. Then find the line `#define USB_VERSION 0x200` and change `0x200` to `0x210`. That's it!

  **OSX:** Right click on the Ardunio application icon and then click on show package contents menu item. Navigate to `Contents/Java/hardware/arduino/avr/cores/arduino/USBCore.h`

5. Copy the `arduino/WebUSB` directory from this repository into the `libraries` folder in your sketchbooks directory.

6. Load up `arduino/sketch/sketch.ino` and program it to your device.

## Install

	$ npm install

## Compile

	$ grunt

## Excecute

	$ npm run server

License MIT
