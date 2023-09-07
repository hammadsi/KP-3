import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Appbar, Text, useTheme} from 'react-native-paper';

export type AppHeaderProps = StackHeaderProps;

/**
 * Component for rendering the applications main header
 * @param props the props
 * @see {@link AppHeaderProps}
 * @see {@link Appbar.Header}
 */
const AppHeader: React.FC<AppHeaderProps> = ({navigation, back}) => {
  const {colors} = useTheme();
  return back ? (
    <Appbar.Header
      style={(styles.wrapper, {backgroundColor: colors.background})}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Icon
          size={30}
          style={styles.backIcon}
          color="#0081cb"
          name="chevron-left"
        />
        <Text style={styles.backTitle}>{back.title}</Text>
      </TouchableOpacity>
    </Appbar.Header>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
    justifyContent: 'flex-start',
  },
  back: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  backIcon: {
    paddingTop: 3,
  },
  backTitle: {
    color: '#0081cb',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default AppHeader;
