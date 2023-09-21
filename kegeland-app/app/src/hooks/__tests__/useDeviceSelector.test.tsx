import React from 'react';
import {renderHook} from '@testing-library/react-hooks/native';
import {Provider} from 'react-redux';
import {merge} from 'lodash';

import useDeviceSelector from '~hooks/useDeviceSelector';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {BluetoothState} from '~state/ducks/bluetooth/bluetooth.interface';
import {initialState} from '~state/ducks/bluetooth/bluetooth.reducer';
import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';

describe('Test useDeviceSelector-hook', () => {
  it('should return correct device', () => {
    const bluetoothState: BluetoothState = {
      ...initialState,
      connectedDevices: {[deviceMock.id]: deviceMock},
    };
    const store = mockStore(merge({bluetooth: bluetoothState}, initialStore));
    const {result} = renderHook(() => useDeviceSelector('femfit'), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });
    expect(result.current?.type).toEqual('femfit');
  });

  it('should return undefined if device doesnt exist', () => {
    const {result} = renderHook(() => useDeviceSelector('femfit'), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={mockStore(initialStore)}>{children}</Provider>
      ),
    });
    expect(result.current).toBe(undefined);
  });
});
