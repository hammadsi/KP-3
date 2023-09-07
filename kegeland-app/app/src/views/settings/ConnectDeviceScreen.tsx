import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import BluetoothDeviceList from '~components/BluetoothDeviceList';
import Section from '~components/Section';
import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {SettingsScreenProps} from '~routes/interface';
import {
  forceStopDeviceScan,
  startDeviceScan,
} from '~state/ducks/bluetooth/bluetooth.actions';
import {clearAvailableDevices} from '~state/ducks/bluetooth/bluetooth.reducer';

/**
 * ConnectDeviceScreen. Screen for connecting to available bluetooth-devices
 * @see {@link SettingsScreenProps}
 */
const ConnectDeviceScreen: React.FC<
  SettingsScreenProps<'Connect device'>
> = () => {
  const dispatch = useAppDispatch();
  const {availableDevices} = useAppSelector((state) => state.bluetooth);

  useEffect(() => {
    dispatch(startDeviceScan());

    return () => {
      dispatch(forceStopDeviceScan());
      dispatch(clearAvailableDevices());
    };
  }, []);

  return (
    <SafeAreaView testID="ConnectDeviceScreen">
      <ScrollView style={styles.wrapper}>
        <Section title="Available devices">
          <BluetoothDeviceList devices={Object.values(availableDevices)} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
});

export default ConnectDeviceScreen;
