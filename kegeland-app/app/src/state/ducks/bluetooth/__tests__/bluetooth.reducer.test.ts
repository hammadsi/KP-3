import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {store} from '~state/store';
import * as utils from '~utils/bluetooth';

import {
  connectDevice,
  disconnectDevice,
  forceStopDeviceScan,
  startDeviceScan,
} from '../bluetooth.actions';
import {BluetoothDevice, BluetoothState} from '../bluetooth.interface';
import bluetoothReducer, {
  addAvailableDevice,
  addHousekeepingService,
  deviceDisconnected,
  initialState,
  setError,
  setReady,
  stopDeviceScan,
  updateBattery,
} from '../bluetooth.reducer';

describe('Test bluetooth-reducer', () => {
  it('Should return initial state', () => {
    const state = store.getState().bluetooth;
    expect(state).toEqual(initialState);
  });

  it('@bluetooth/setReady should set ready state', () => {
    const action = {
      type: setReady.type,
    };
    const state = bluetoothReducer(initialState, action);
    expect(state).toEqual({...initialState, isReady: true});
  });

  it('@bluetooth/setError should set error', () => {
    const action = {
      type: setError.type,
      payload: 'error',
    };
    const state = bluetoothReducer(initialState, action);
    expect(state).toEqual({...initialState, error: 'error'});
  });

  it('@bluetooth/setError with no payload should clear error', () => {
    const action = {
      type: setError.type,
    };
    const state = bluetoothReducer({...initialState, error: 'error'}, action);
    expect(state).toEqual(initialState);
  });

  it('@bluetooth/stopDeviceScan should set isScanning false', () => {
    const action = {
      type: stopDeviceScan.type,
    };
    const state = bluetoothReducer({...initialState, isScanning: true}, action);
    expect(state).toEqual(initialState);
  });

  it('@bluetooth/updateBattery should update device battery state', () => {
    const batValBytes = [213, 123, 321, 123, 213, 213, 123];
    const batVal = 0.8;
    jest
      .spyOn(utils, 'readPeripheralDeviceBattery')
      .mockImplementation(() => batVal);
    const action = {
      type: updateBattery.type,
      payload: {peripheral: deviceMock.id, value: batValBytes},
    };
    const newDevice: BluetoothDevice = {...deviceMock, battery: batVal};
    const state = bluetoothReducer(
      {...initialState, connectedDevices: {[deviceMock.id]: deviceMock}},
      action,
    );
    expect(state).toEqual({
      ...initialState,
      connectedDevices: {[deviceMock.id]: newDevice},
    });
  });
  it('@bluetooth/addHousekeepingService should add housekeeping service', () => {
    const uuid = '123';
    const peripheral = deviceMock.id;
    const action = {
      type: addHousekeepingService.type,
      payload: {uuid, peripheral},
    };
    const state = bluetoothReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      housekeepers: {[uuid]: peripheral},
    });
  });

  it('@bluetooth/deviceDisconnected should remove peripheral from state', () => {
    const uuid = '123';
    const peripheral = deviceMock.id;
    const startState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: deviceMock},
      housekeepers: {[uuid]: peripheral},
    };
    const action = {
      type: deviceDisconnected.type,
      payload: peripheral,
    };
    const state = bluetoothReducer(startState, action);
    expect(state).toEqual(initialState);
  });

  it('@bluetooth/addAvailableDevice should add device to list of available devices', () => {
    const peripheral = deviceMock.id;
    const action = {
      type: addAvailableDevice.type,
      payload: deviceMock,
    };
    const state = bluetoothReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      availableDevices: {[peripheral]: deviceMock},
    });
  });

  it('@bluetooth/addAvailableDevice should not add device if already in list of available devices', () => {
    const peripheral = deviceMock.id;
    const startState: BluetoothState = {
      ...initialState,
      availableDevices: {[peripheral]: deviceMock},
      connectedDevices: {[peripheral]: deviceMock},
    };
    const action = {
      type: addAvailableDevice.type,
      payload: deviceMock,
    };
    const state = bluetoothReducer(startState, action);
    expect(state).toEqual(startState);
  });

  it('@bluetooth/startDeviceScan/fulfilled should set isScanning to true', () => {
    const action = {
      type: startDeviceScan.fulfilled.type,
    };
    const state = bluetoothReducer(
      {...initialState, isScanning: false},
      action,
    );
    expect(state).toEqual({...initialState, isScanning: true});
  });

  it('@bluetooth/startDeviceScan/rejected should set isScanning to false', () => {
    const action = {
      type: startDeviceScan.rejected.type,
      error: 'error',
    };
    const state = bluetoothReducer({...initialState, isScanning: true}, action);
    expect(state).toEqual({...initialState, isScanning: false});
  });

  it('@bluetooth/connectDevice/pending should set device state to "connecting"', () => {
    const peripheral = deviceMock.id;
    const startState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: deviceMock},
      availableDevices: {[peripheral]: deviceMock},
    };
    const newDevice: BluetoothDevice = {...deviceMock, state: 'connecting'};
    const finalState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: newDevice},
      availableDevices: {[peripheral]: newDevice},
    };
    const action = {
      type: connectDevice.pending.type,
      meta: {arg: peripheral},
    };
    const state = bluetoothReducer(startState, action);
    expect(state).toEqual(finalState);
  });

  it('@bluetooth/connectDevice/rejected should set device state to "available"', () => {
    const peripheral = deviceMock.id;
    const startState: BluetoothState = {
      ...initialState,
      availableDevices: {[peripheral]: {...deviceMock, state: 'connecting'}},
    };
    const finalState: BluetoothState = {
      ...initialState,
      availableDevices: {[peripheral]: deviceMock},
    };
    const action = {
      type: connectDevice.rejected.type,
      meta: {arg: peripheral},
      error: 'error',
    };
    const state = bluetoothReducer(startState, action);
    expect(state).toEqual(finalState);
  });

  it('@bluetooth/connectDevice/rejected should remove device from connected devices', () => {
    const peripheral = deviceMock.id;
    const startState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: {...deviceMock, state: 'connecting'}},
    };
    const finalState: BluetoothState = {
      ...initialState,
      connectedDevices: {},
    };
    const action = {
      type: connectDevice.rejected.type,
      meta: {arg: peripheral},
      error: 'error',
    };
    const state = bluetoothReducer(startState, action);
    expect(state).toEqual(finalState);
  });

  it('@bluetooth/connectDevice/fulfilled should add device to connectedDevices', () => {
    const peripheral = deviceMock.id;
    const startState: BluetoothState = {
      ...initialState,
      availableDevices: {[peripheral]: deviceMock},
    };
    const newDevice: BluetoothDevice = {...deviceMock, state: 'connected'};
    const finalState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: newDevice},
      availableDevices: {[peripheral]: newDevice},
    };
    const action = {
      type: connectDevice.fulfilled.type,
      meta: {arg: peripheral},
    };
    const state = bluetoothReducer(startState, action);
    expect(state).toEqual(finalState);
  });

  it('@bluetooth/connectDevice/fulfilled should set device state to "connected"', () => {
    const peripheral = deviceMock.id;
    const startState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: deviceMock},
      availableDevices: {[peripheral]: deviceMock},
    };
    const newDevice: BluetoothDevice = {...deviceMock, state: 'connected'};
    const finalState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: newDevice},
      availableDevices: {[peripheral]: newDevice},
    };
    const action = {
      type: connectDevice.fulfilled.type,
      meta: {arg: peripheral},
    };
    const state = bluetoothReducer(startState, action);
    expect(state).toEqual(finalState);
  });

  it('@bluetooth/disconnectDevice/pending should set device state to "disconnecting"', () => {
    const peripheral = deviceMock.id;
    const startState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: deviceMock},
    };
    const newDevice: BluetoothDevice = {...deviceMock, state: 'disconnecting'};
    const finalState: BluetoothState = {
      ...initialState,
      connectedDevices: {[peripheral]: newDevice},
    };
    const action = {
      type: disconnectDevice.pending.type,
      meta: {arg: peripheral},
    };
    const state = bluetoothReducer(startState, action);
    expect(state).toEqual(finalState);
  });

  describe('Should set error message for rejected actions', () => {
    const error = new Error('Error');
    const startState = initialState;
    const finalState = {
      ...initialState,
      error: error.message,
    };
    beforeAll(() => {});

    it('@bluetooth/startDeviceScan/rejected', () => {
      const action = {
        type: startDeviceScan.rejected.type,
        error,
      };
      const state = bluetoothReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@bluetooth/forceStopDeviceScan/rejected', () => {
      const action = {
        type: forceStopDeviceScan.rejected.type,
        error,
      };
      const state = bluetoothReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@bluetooth/connectDevice/rejected', () => {
      const action = {
        type: connectDevice.rejected.type,
        meta: {arg: deviceMock.id},
        error,
      };
      const state = bluetoothReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@bluetooth/disconnectDevice/rejected', () => {
      const action = {
        type: disconnectDevice.rejected.type,
        meta: {arg: deviceMock.id},
        error,
      };
      const state = bluetoothReducer(startState, action);
      expect(state).toEqual(finalState);
    });
  });

  describe('Should clear error message for pending actions', () => {
    const startState = {...initialState, error: 'Error'};
    const finalState = {
      ...initialState,
      error: undefined,
    };

    beforeAll(() => {});

    it('@bluetooth/startDeviceScan/pending', () => {
      const action = {
        type: startDeviceScan.pending.type,
      };
      const state = bluetoothReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@bluetooth/forceStopDeviceScan/pending', () => {
      const action = {
        type: forceStopDeviceScan.pending.type,
      };
      const state = bluetoothReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@bluetooth/connectDevice/pending', () => {
      const action = {
        type: connectDevice.pending.type,
        meta: {arg: deviceMock.id},
      };
      const state = bluetoothReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@bluetooth/disconnectDevice/pending', () => {
      const action = {
        type: disconnectDevice.pending.type,
        meta: {arg: deviceMock.id},
      };
      const state = bluetoothReducer(startState, action);
      expect(state).toEqual(finalState);
    });
  });
});
