import React from 'react';
import {Switch, useTheme} from 'react-native-paper';

import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {updateSetting} from '~state/ducks/app/app.actions';

export type ThemeSwitchProps = {
  style?:
    | {
        marginRight: number;
        marginVertical?: number | undefined;
      }
    | undefined;
};

/**
 * Component for switching the app's color theme
 * @param props the props
 * @see {@link ThemeSwitchProps}
 * @see {@link Switch}
 * @see {@link useTheme}
 */
const ThemeSwitch: React.FC<ThemeSwitchProps> = (props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {darkMode} = useAppSelector((state) => state.app.settings);
  const toggle = () => {
    dispatch(updateSetting<'darkMode'>({key: 'darkMode', value: !darkMode}));
  };
  return (
    <Switch
      color={colors.primary}
      trackColor={{
        false: colors.placeholder,
        true: colors.primary,
      }}
      value={darkMode}
      onValueChange={() => toggle()}
      {...props}
    />
  );
};

export default ThemeSwitch;
