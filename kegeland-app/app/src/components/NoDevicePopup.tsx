import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Paragraph, Text} from 'react-native-paper';

import {RootTabParamList} from '~routes/interface';

import Popup from './Popup';

export type NoDevicePopupProps = {
  visible: boolean;
  onDismiss: () => void;
  deviceName: string;
};

/**
 * Component for rendering popup when connection to a device is lost.
 * @param props the props
 * @see {@link NoDevicePopupProps}
 * @see {@link Popup}
 */
const NoDevicePopup: React.FC<NoDevicePopupProps> = ({deviceName, visible}) => {
  const nav = useNavigation<NavigationProp<RootTabParamList>>();

  const handleDismiss = () => {
    nav.navigate('SettingsStack', {screen: 'Settings'});
  };

  return (
    <Popup
      title="No device connected"
      visible={visible}
      contentContainerStyle={styles.popup}
      actions={<Button onPress={handleDismiss}>Go to settings</Button>}>
      <Paragraph textBreakStrategy="simple">
        No device of type <Text style={styles.highlight}>{deviceName}</Text> is
        connected. Please go to <Text style={styles.highlight}>Settings</Text>{' '}
        and connect your device before proceeding
      </Paragraph>
    </Popup>
  );
};

const styles = StyleSheet.create({
  popup: {
    width: '80%',
    zIndex: 30000,
  },
  highlight: {
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

export default NoDevicePopup;
