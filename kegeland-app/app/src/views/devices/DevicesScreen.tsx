import {capitalize, clone, forEach, reduce} from 'lodash';
import React, {useEffect, useState} from 'react';
import {ImageSourcePropType, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, List, useTheme} from 'react-native-paper';

import {BLE_PROFILES, DeviceType} from '~constants/bluetooth';
import {DeviceScreenProps} from '~routes/interface';
import FemfitImage from '~assets/devices/femfit.png';
import useAppSelector from '~hooks/useAppSelector';
import PageWrapper from '~components/PageWrapper';
import {getDeviceScreen} from '~utils/bluetooth';

const deviceTypes = Object.keys(BLE_PROFILES);

const imgMap: Record<DeviceType, ImageSourcePropType> = {
  femfit: FemfitImage,
};

const initialDeviceMap = reduce(
  deviceTypes,
  (prev, curr) => {
    prev[curr as DeviceType] = false;
    return prev;
  },
  {} as Record<DeviceType, boolean>,
);

/**
 * DevicesScreen. Screen for showing available devices, which
 * allows you to initiate a session for one of the devices.
 * @see {@link DeviceScreenProps}
 */
const DevicesScreen: React.FC<DeviceScreenProps<'Devices'>> = ({
  navigation,
}) => {
  const {colors, roundness} = useTheme();
  const [devices, setDevices] =
    useState<Record<DeviceType, boolean>>(initialDeviceMap);
  const {connectedDevices} = useAppSelector((state) => state.bluetooth);

  /**
   * Create a dictionary of connected devices on mount
   */
  useEffect(() => {
    const tmp = clone(initialDeviceMap);
    forEach(connectedDevices, (device) => {
      tmp[device.type] = true;
    });
    setDevices(tmp);
  }, [connectedDevices]);

  return (
    <PageWrapper
      title="Select device"
      contentSize="medium"
      testID="DevicesScreen">
      <ScrollView style={styles.deviceList}>
        {Object.entries(devices).map(([type, connected]) => (
          <List.Item
            key={type}
            style={{
              backgroundColor: colors.elevation.elevation1,
              borderRadius: roundness,
            }}
            title={capitalize(type)}
            description={connected ? 'Connected' : 'Not connected'}
            left={() => (
              <Avatar.Image
                style={[
                  {backgroundColor: colors.placeholder},
                  styles.listItemExtra,
                ]}
                size={48}
                source={imgMap[type as DeviceType]}
              />
            )}
            right={() => (
              <Button
                mode="contained"
                style={styles.listItemExtra}
                disabled={!connected}
                onPress={() =>
                  navigation.navigate(getDeviceScreen(type as DeviceType))
                }>
                Select
              </Button>
            )}
          />
        ))}
      </ScrollView>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
  deviceList: {
    marginTop: 16,
  },
  listItemExtra: {
    alignSelf: 'center',
  },
});

export default DevicesScreen;
