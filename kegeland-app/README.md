![CI/CD](https://github.com/TDT4290-Gruppe-10/kegeland-app/actions/workflows/on-pull-request.yml/badge.svg)
[![codecov](https://codecov.io/gh/TDT4290-Gruppe-10/kegeland-app/branch/main/graph/badge.svg?token=INKSH5U1NP)](https://codecov.io/gh/TDT4290-Gruppe-10/kegeland-app)

# Kegeland Mobile Application

## Description

This repository is a part of a delivery in the course [TDT4290 costumer driven project](https://www.ntnu.no/studier/emner/TDT4290/2017/1#tab=omEmnet) at NTNU.

This repository contains the code for the mobile appilcation of the project. The app's functions in this project is to provide a remote bridge between physicians and their patients. This is done by letting the users of the app connect supported bluetooth devices to the app, which during exercises, will monitor and upload key metrics to a [dashboard](https://github.com/TDT4290-Gruppe-10/kegeland-frontend) available for physicians.

> This repository depends on the [API](https://github.com/TDT4290-Gruppe-10/kegeland-api) to run locally in the background in order to function properly

## Project structure

- `app`: This folder contains the applications source code
  - `assets`: Asset folder to store all images, vectors, fonts, etc.
  - `src`: This folder is the main container of all the code inside the application
    - `components`: Folder to store dumb components, i.e. components with minimal logic
    - `constants`: Folder to store any kind of constant that the project relies on
    - `hooks`: Folder for higher-order components, which enables reusing of component logic
    - `hooks`: Folder to store custom React-hooks, mostly used for data-fetching
    - `lib`: This folder contains code for integrating custom functionality, such as new bluetooth devices
    - `routes`: Folder to store the navigators
    - `state`: This folder contains all logic for Redux state management
    - `utils`: Folder to store any common stateless function which is commonly used in the project
    - `views`: This folder contains all the pages/views of the app
  - `App.tsx`: Main component that starts the whole app.
  - `index.js`: Entry point of the application as per React-Native standards.

The important elements of this structure is that `App.tsx` renders the routes defined in the `routes/Routes.tsx` file, where the program defines paths for the pages of the web application and decides which `pages`-component to render. Wihin a page, user interface is defined and utilizes often used components like buttons or similar from the `components` directory.

Many pages will also use the custom hooks developed to retrieve data relevant for its usage. This implementation can be found in the `hooks` directory, which in turn uses the programs implementation of [Redux](https://react-redux.js.org/). These will also use some functions from the `utils` directory, where standard and reusable functions are defined.

## Development view - Example use case

<img src="resources\ProcessviewApp.jpg">

## Getting started

### Cloning and configuring the project

1. Clone this project by running
   ```node
   git clone https://github.com/TDT4290-Gruppe-10/kegeland-app.git
   ```
2. Navigate to the `app`-folder, and rename `.env.test` to `.env`
3. Open the `.env`-file in any text-editor you like and replace the field `API_URL` with your local IP-address.
   - On _MacOS_, your IP-address can be found by running the following command:
     ```node
     Ipconfig getifaddr en0
     ```
   - On _Windows_, your IP-address can be found by running the following command:
     ```node
     ipconfig;
     ```
     > Your IP-address will be the `IPv4 address`

### Node, JDK

1. Download and install [`node`](https://nodejs.org/en/download/)
2. Install [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) using `npm install --global yarn`

For further configuration, you will need developer tools from either iOS or Android depending on which platform you wish to run on.

### Setting up Android

#### Android development environment

A detailed guide can be found in the [official documentation](https://reactnative.dev/docs/environment-setup) for React Native, however the process is outlined below.

1. [Download Android Studio](https://developer.android.com/studio/index.html). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:
   - `Android SDK`
   - `Android SDK Platform`
   - `Android Virtual Device`
2. Install version 12 or higher of the Android SDK through Android Studio
3. Configure the `ANDROID_HOME` environment variable

   1. Open the Windows Control Panel.
   2. Click on User Accounts, then click User Accounts again
   3. Click on Change my environment variables
   4. Click on New... to create a new `ANDROID_HOME` user variable that points to the path to your Android SDK

   The SDK is installed, by default, at the following location:

   ```node
   %LOCALAPPDATA%\Android\Sdk
   ```

4. Add platform-tools to Path

   1. Open the Windows Control Panel.
   2. Click on User Accounts, then click User Accounts again
   3. Click on Change my environment variables
   4. Select the Path variable.
   5. Click Edit.
   6. Click New and add the path to platform-tools to the list.

   The default location for this folder is:

   ```node
   %LOCALAPPDATA%\Android\Sdk\platform-tools
   ```

5. Verify the configuration of `ANDROID_HOME`
   1. Open powershell
   2. Copy and paste Get-ChildItem -Path Env:\ into powershell
   3. Verify `ANDROID_HOME` has been added

#### Preparing the Android device

You will need an Android device to run your React Native Android app. This can be either a physical Android device, or more commonly, you can use an Android Virtual Device which allows you to emulate an Android device on your computer.

Either way, you will need to prepare the device to run Android apps for development.

##### Using a physical device

If you have a physical Android device, you can use it for development in place of an AVD by plugging it in to your computer using a USB cable and following the instructions [here](https://reactnative.dev/docs/running-on-device).

##### Using a virtual device

If you use Android Studio to open `./AwesomeProject/android`, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio. Look for an icon that looks like this:

Android Studio AVD Manager

If you have recently installed Android Studio, you will likely need to create a new AVD. Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the S API Level 31 image.

> If you don't have HAXM installed, click on "Install HAXM" or follow these instructions to set it up, then go back to the AVD Manager.

Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

#### Running the app on Android

1. First of all navigate to the `app` folder which contains the source code. From the root-level of the project, you can run:
   ```node
    cd app
   ```
2. Install the necessary dependencies
   ```node
    yarn install
   ```
3. You are now ready to start the application. For _Android_, this is done by running the following command in your terminal
   ```node
   yarn android
   ```

### Setting up on iPhone

To run the app on the iPhone you need both a MacBook and the iPhone. On the MacBook download the latest version of Xcode from App Store. The application can either be run physically on the iPhone or using a virtual device in Xcode.

#### Installing necessary dependencies:

1. On the MacBook, open the terminal. On newer MacBooks with the M1 chip you have to open a terminal using rosetta. This can be done by right clicking the terminal and check the option for 'open with rosetta'.

2. In the terminal run the command

```node
sudo gem install cocoapods
```

This will install cocoapods library to the system library (which is necessary to run the app).

3. Navigate to the folder where the app is downloaded. Inside the folder navigate to ‘/app/ios’ and run the command

```node
pods install
```

This will install necessary PODS for the project to run.

4. Navigate back to the main folder of the app and run the command

```node
yarn install
```

#### Setting up Xcode

1. Open up Xcode. On M1 and newer MacBooks the user has to first right click Xcode and check the option for opening with rosetta.

2. Select ‘Open a project or file’ and navigate to ‘/app/ios/‘ inside the folder where the app is downloaded. From there select and open ‘app.xcworkspace’.

The project should be loaded and ready to build

#### Building the app

In the top field in Xcode you should be able to choose devices to build the app on. To run on a virtual device you can choose one of the iOS simulators.

To run on the physical iPhone you have to connect the iPhone to the MacBook with a USB cable. The device should be recognized in Xcode and in the top field you should be able to select your connected device.

After selecting the device, click the play button on the left side and Xcode will start to build the app on this device.

Note: When building on the physical device for the first time you might have to go to approve the app being installed on the iPhone. This can be done by navigating to 'Settings > General > VPN and Device Management' and trusting the current profile

### Testing

#### Unit tests

Unit tests can be ran by using the following command

```node
  yarn test
```

#### E2E tests

> E2E-tests are currently only supported using the **Android environment**

End-to-end tests can be ran by using the following command. Make sure you have a emulator available as this is needed to run the e2e-tests

```node
  yarn test:e2e
```

The emulator needs to be named **Pixel_4_API_30**. A configuration in **Android Studio** equal to the image displayed below should suffice.
![Android Studio configuration](/resources/android_emulator.jpg)


#### Integration tests

> Integration tests are currently only supported using the **Android environment**

Integration tests can be ran by using the following command. Make sure you have a emulator available as this is needed to run the integration tests

```node
  yarn test:integration
```

The emulator needs to be named **Pixel_4_API_30**. A configuration in **Android Studio** equal to the image displayed below should suffice.
![Android Studio configuration](/resources/android_emulator.jpg)


