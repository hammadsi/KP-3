import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List, Text, useTheme} from 'react-native-paper';

import useAppSelector from '~hooks/useAppSelector';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

import BluetoothDeviceItem from './BluetoothDeviceItem';
import Icon from './Icon';
import ListItemSkeleton from './ListItemSkeleton';

export type BluetoothDeviceListProps = {
  devices: BluetoothDevice[];
};

/**
 * Component for rendering a list of bluetooth devices.
 * @param props the props
 * @see {@link BluetoothDeviceListProps}
 */
const BluetoothDeviceList: React.FC<BluetoothDeviceListProps> = ({devices}) => {
  const {colors} = useTheme();
  const {isScanning} = useAppSelector((state) => state.bluetooth);
  const render = () => {
    if (!isScanning && devices.length === 0) {
      // Render a message if the list is empty
      return (
        <View style={styles.errorWrapper}>
          <Icon
            style={styles.errorIcon}
            color={colors.primary}
            icon="alert-circle-outline"
            size={32}
          />
          <Text style={styles.errorText}>No devices found!</Text>
        </View>
      );
    } else {
      return devices.length > 0
        ? devices.map((device) => (
            <BluetoothDeviceItem key={device.id} device={device} />
          ))
        : Array.from({length: 3}, (_v, i) => <ListItemSkeleton key={i} />);
    }
  };
  return <List.Section>{render()}</List.Section>;
};

const styles = StyleSheet.create({
  errorWrapper: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  errorIcon: {
    flex: 1,
  },
  errorText: {
    flex: 1,
    paddingTop: 8,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default BluetoothDeviceList;
