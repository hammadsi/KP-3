import React, {useState} from 'react';
import {capitalize, round} from 'lodash';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Menu, Title, Text, useTheme} from 'react-native-paper';

import useAppDispatch from '~hooks/useAppDispatch';
import {
  disconnectDevice,
  connectDevice,
} from '~state/ducks/bluetooth/bluetooth.actions';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

import Icon from './Icon';

export type BluetoothDeviceItemProps = {
  device: BluetoothDevice;
};

/**
 * Returns an icon based on the device's battery level
 * @param power the device power
 * @returns icon based on device power
 */
const getBatteryLevelIcon = (power: number) => {
  const val = round(power, 1) * 100;
  if (val === 100) {
    return 'battery-bluetooth';
  }

  return `battery-${val}-bluetooth`;
};

/**
 * Component for rendering a bluetooth device item.
 * @param props the props
 * @see {@link BluetoothDeviceItemProps}
 */
const BluetoothDeviceItem: React.FC<BluetoothDeviceItemProps> = ({device}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();

  /**
   * Color indicator based on the device's state
   */
  const stateColor = () => {
    switch (device.state) {
      case 'connected':
        return colors.status.success;
      default:
        return colors.status.alert;
    }
  };

  const [visible, setVisible] = useState<boolean>(false);
  const toggle = () => {
    setVisible(!visible);
  };

  /**
   * Handle touch interaction.
   * Will disconnect if the device is connected, else connect
   */
  const handlePress = () => {
    switch (device.state) {
      case 'connected':
        dispatch(disconnectDevice(device.id));
        break;
      default:
        dispatch(connectDevice(device.id));
    }
    setVisible(false);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.leftWrapper}>
        <Icon icon="bluetooth" size={24} color={colors.primary} />
      </View>
      <View style={styles.centerWrapper}>
        <View style={styles.titleWrapper}>
          <Title style={styles.title}>{device.name}</Title>
          <View style={styles.statusWrapper}>
            <Icon
              icon="circle"
              size={8}
              style={[styles.statusIcon, {color: stateColor()}]}
            />
            <Text style={styles.statusText}>{capitalize(device.state)}</Text>
          </View>
        </View>
        {device.battery && (
          <View style={styles.batteryWrapper}>
            <Text style={styles.batteryText}>{device.battery * 100}%</Text>
            <Icon
              icon={getBatteryLevelIcon(device.battery)}
              color={colors.status.success}
            />
          </View>
        )}
      </View>
      <View style={styles.rightWrapper}>
        <Menu
          visible={visible}
          onDismiss={toggle}
          contentStyle={styles.popup}
          anchor={
            <TouchableOpacity onPress={toggle}>
              <Icon icon="dots-vertical" size={24} />
            </TouchableOpacity>
          }>
          <Menu.Item
            theme={{roundness: 15}}
            onPress={handlePress}
            title={device.state === 'connected' ? 'Disconnect' : 'Connect'}
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
    flexDirection: 'row',
  },
  leftWrapper: {
    alignSelf: 'center',
    marginRight: 8,
  },
  centerWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    marginTop: 2,
    marginVertical: 0,
  },
  statusWrapper: {
    flexDirection: 'row',
  },
  statusText: {
    fontSize: 12,
    lineHeight: 14,
  },
  statusIcon: {
    marginRight: 4,
  },
  rightWrapper: {
    position: 'relative',
    alignSelf: 'center',
  },
  batteryWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  batteryText: {marginRight: 4},
  popup: {
    paddingVertical: 0,
    position: 'relative',
    top: '-25%',
    right: 30,
    zIndex: 1000,
  },
});

export default BluetoothDeviceItem;
