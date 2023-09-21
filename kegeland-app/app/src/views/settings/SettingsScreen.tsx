import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {size} from 'lodash';

import Accordion from '~components/Accordion';
import BluetoothDeviceItem from '~components/BluetoothDeviceItem';
import Badge from '~components/Badge';
import ListItem from '~components/ListItem';
import Section from '~components/Section';
import ThemeSwitch from '~components/ThemeSwitch';
import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {SettingsScreenProps} from '~routes/interface';
import {setAnchorRoute} from '~state/ducks/app/app.reducer';
import {signOutUser} from '~state/ducks/auth/auth.actions';

/**
 * SettingsScreen. The view for the application's settings
 * @see {@link SettingsScreenProps}
 */
const SettingsScreen: React.FC<SettingsScreenProps<'Settings'>> = ({
  navigation,
}) => {
  const {auth, bluetooth} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView testID="SettingsScreen">
      <ScrollView style={styles.wrapper}>
        <Section title="Account">
          {auth.isSignedIn && !auth.loading ? (
            <List.Section>
              <ListItem
                icon="account-circle-outline"
                title={auth.authUser?.email}
              />
              <ListItem icon="lock-outline" title="Change password" isRoute />
              <ListItem
                icon="logout"
                title="Sign out"
                isRoute
                onPress={() => dispatch(signOutUser())}
              />
            </List.Section>
          ) : (
            <List.Section>
              <ListItem
                icon="login"
                title="Sign in"
                loading={auth.loading}
                isRoute
                onPress={() => {
                  dispatch(
                    setAnchorRoute(['SettingsStack', {screen: 'Settings'}]),
                  );
                  navigation.navigate('AuthStack', {screen: 'Login'});
                }}
              />
            </List.Section>
          )}
        </Section>
        <Section title="Display">
          <List.Section>
            <ListItem
              title="Theme"
              icon="brightness-4"
              render={(props) => <ThemeSwitch {...props} />}
            />
          </List.Section>
        </Section>

        <Section title="Devices">
          <List.Section>
            <ListItem
              title="Connect device"
              icon="bluetooth-connect"
              isRoute
              onPress={() => navigation.navigate('Connect device')}
            />
            <Accordion
              title="Connected devices"
              icon={<Badge>{size(bluetooth.connectedDevices)}</Badge>}>
              {Object.values(bluetooth.connectedDevices).map((device) => (
                <BluetoothDeviceItem key={device.id} device={device} />
              ))}
            </Accordion>
          </List.Section>
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

export default SettingsScreen;
