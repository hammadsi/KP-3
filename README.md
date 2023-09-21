# KP-3
Customer Driven Project - Group 3

# Wheelchair Ergometer Game Controller

This project allows an Invictus Trainer to interface with a computer or smartphone using encoders and an nRF52840 microcontroller.
## Installation

### Prerequisites
- Zephyr RTOS
- nRF Connect SDK

You can get started by downloading the nRF Connect SDK, which includes the Zephyr RTOS. [Installation Guide](https://developer.nordicsemi.com/nRF_Connect_SDK/doc/2.1.2/nrf/gs_assistant.html)

## Project Setup

### Setting up with nRF Connect SDK v2.1.2 (Recommended)

1. Copy the `wheelchair-ergometer-game-controller` into the root directory of an existing nRF Connect SDK v2.1.2 installation. The directory path should be `C:\ncs\v2.1.2\wheelchair-ergometer-game-controller`.

## Build Instructions

1. Navigate to the project directory:  
   ```
   cd C:\ncs\v2.1.2\wheelchair-ergometer-game-controller
   ```
2. Execute the following build command:  
   ```
   west build -b adafruit_itsybitsy_nrf52840
   ```

   - If the build fails, you can clean and rebuild:  
   ```
   west build -p -b adafruit_itsybitsy_nrf52840
   ```

### Adafruit ItsyBitsy nRF52840 Setup

1. Add board support by copying the `adafruit_itsybitsy_nrf52840` folder into `ncs/v2.1.2/zephyr/boards/arm`.

## Flashing the Firmware

### Adafruit ItsyBitsy nRF52840 Express

1. Update the bootloader as described in [Adafruit nRF52840 Guide](https://learn.adafruit.com/introducing-the-adafruit-nrf52840-feather/update-bootloader-use-command-line).
2. Identify the COM port from Device Manager. To proceed to the next step, you need to identify the correct COM port. This can be done as follows: 

Press `Win + X` and select "Device Manager" from the context menu. 

In the Device Manager window, expand the "Ports (COM & LPT)" section. You will see a list of COM ports along with their corresponding devices. 

COM ports that are currently in use will have a device listed under them. The device's name will give you an idea of what it's connected to. For example, if you have a USB-to-Serial adapter connected, it might be listed under one of the COM ports. 

3. Use the following command to flash, replacing xx with your port number:  
   ```
   adafruit-nrfutil.exe --verbose dfu serial --package itsybitsy_nrf52840_express_bootloader-0.7.0_s140_6.1.1.zip --port COMxx -b 115200 --singlebank --touch 1200
   ```
4. To flash the `.uf2` file, double tap the RST button and drag the `zephyr.uf2` into the `ITSY840BOOT` drive.

## Controller Configuration

Choose either `CONFIG_HID_MODULE_CONTROLLER_OUTPUT_A=y` or `CONFIG_HID_MODULE_CONTROLLER_OUTPUT_B=y` in the `prj.conf` file based on your needs. We have tested the setup with option A.

## Device Connectivity

The device will appear as "Wheelchair Ergometer" on Bluetooth LE (4.0).

## Light Indicators

| Color  | Number of Flashes | Duration | Meaning                    |
|--------|-------------------|----------|----------------------------|
| Green  | 1                 | Long     | Device successfully booted |
| Blue   | 10                | Long     | Device is advertising      |
| Orange | 2                 | Medium   | Unsecure connection        |
| Green  | 2                 | Medium   | Secure connection          |
| Red    | 5                 | Medium   | Failed to connect          |
| Red    | 2                 | Short    | Disconnected               |

## Troubleshooting

### Pairing Issues
To clear the device's pairing memory:
1. Tap the "RST" button to reset.
2. Quickly double tap the "SW" button within 5 seconds.

For more detailed logs, consider using [TeraTerm](https://ttssh2.osdn.jp/index.html.en) with the following settings:
- Speed: 115200
- Data: 8 bit
- Parity: none
- Stop bits: 1 bit
- Flow control: none

For instructions on how to set up TeraTerm, refer to the official documentation linked above.

# Connecting the Polar belt H10

## **Setup `Excite-O-Meter|Devices`**

The `Excite-O-Meter|Devices` configures the communication interface for the physiological sensor, collects data via Bluetooth, and streams them to the Unity Editor via [LSL](https://github.com/sccn/labstreaminglayer). It is available as a Universal Windows Platform **UWP for Windows 10**. 

The primary purpose is to transform the data captured from devices that are not natively compatible with LSL into valid LSL outlets that can be captured in Unity. This middleware might not be needed if there are sensors that are already [compatible with LSL](https://labstreaminglayer.readthedocs.io/info/supported_devices.html). 

The tool is currently supporting the following sensor: Polar H10

## Wearing the Sensor

First, you need to wear the chest strap Polar H10:
- Moisten the electrode area of the strap
- Wear the chest strap
- Attach the connector to activate the HR sensor

## Collecting data

These set of applications are in charge of connecting to the physiological sensor via Bluetooth LE and send data to all applications running with the Excite-O-Meter package from Unity.

# Excite-O-Meter|Devices > for Windows 10 UWP

Requires *Minimum Windows 10, version 1803 (10.0; Build 171734)* 

Download from Windows Store: https://www.microsoft.com/store/apps/9PFMNFQJB99Q

Some important notes about communication between `Excite-O-Meter|Devices` and Unity are:

- To use the **Win10 UWP**, the `Excite-O-Meter|Devices` has a [loopback restriction in UWP apps](https://stackoverflow.com/questions/33259763/uwp-enable-local-network-loopback) that complicates data streaming on the same PC. You can use the [PowerShell script described here](https://github.com/luisqtr/exciteometer-devices-UWP#creating-an-exception-for-the-loopback-restriction) to create an exemption and allow streaming and receiving LSL data from the same device, or run powershell with administrator rights and enter the two following commands:

```
CheckNetIsolation LoopbackExempt -a -n="10247LuisQuintero.ExciteOMeter_k7zc7t0y9176w"
CheckNetIsolation LoopbackExempt -is -n="10247LuisQuintero.ExciteOMeter_k7zc7t0y9176w"
```

- When **running the wheelchair game** as standalone. The first time you run the `.exe`, it will likely prompt a Windows Security alert requesting access to the network. **You must approve allow access**. Since the `Excite-O-Meter|Devices` internally uses socket communication to send data between the sensor and Unity, it needs access to the network. If you do not approve this message, your application will not be able to receive data in your Unity application. This issue can be fixed creating an explicit exception for incoming messages in the *Windows Defender Firewall*.

## Execution

- In the first screen, `Enumerate Devices` to see the available Bluetooth LE devices in advertising mode.
- If the device has never been connected to the app, press `Pair` and it will prompt connection with Windows.
- When the device is paired it will enable the option `Continue`. If a device starting with `Polar H10 ` is detected, it will jump to configure their characteristics. Otherwise, the second screen will be opened to explore their services and characteristics.
- Adjust the toggles according to the variables that want to collect from the sensor (HR+RRi). Note that ECG and ACC cannot be simultaneously enabled, the device stops responding to requests when busy sending both streamings.
- Run the wheelchair game executable, with both the wheelchair ergonomic controller and the Polar H10-belt connected.

