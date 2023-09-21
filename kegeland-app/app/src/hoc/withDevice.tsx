import {capitalize} from 'lodash';
import React, {useEffect, useState, ComponentType} from 'react';

import NoDevicePopup from '~components/NoDevicePopup';
import {DeviceType} from '~constants/bluetooth';
import useDeviceSelector from '~hooks/useDeviceSelector';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

export type WithDeviceContext = {
  device: BluetoothDevice | undefined;
};

/**
 * Higher-order component withDevice.
 * Wraps the component with a device selector used to select a connected
 * device from the redux state. The selected device will be passed to the sub-component
 * as a prop
 * @param deviceType the type of device to select
 * @param Component the component to wrap
 */
const withDevice =
  <P extends WithDeviceContext>(
    deviceType: DeviceType,
    Component: ComponentType<P>,
  ): ComponentType<Omit<P, keyof WithDeviceContext>> =>
  (props) => {
    const [deviceConnected, setDeviceConnected] = useState<boolean>(true);
    const device = useDeviceSelector(deviceType);
    useEffect(() => {
      setDeviceConnected(!!(device && device.state === 'connected'));
    }, [device]);

    const toggle = () => {
      setDeviceConnected(!deviceConnected);
    };

    // Set props for passing to the sub-component
    const mapStateToProps: any = {
      device,
    };

    return (
      <>
        <Component {...props} {...mapStateToProps} />
        <NoDevicePopup
          deviceName={capitalize(deviceType)}
          visible={!deviceConnected}
          onDismiss={toggle}
        />
      </>
    );
  };

export default withDevice;
