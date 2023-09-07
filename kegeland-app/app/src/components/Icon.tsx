import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export type IconProps = {
  color?: string;
  icon: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

/**
 * Component for rendering a icon.
 * @param props the props
 * @see {@link IconProps}
 * @see {@link MaterialIcon}
 */
const Icon: React.FC<IconProps> = (props) => {
  const {colors} = useTheme();
  return (
    <MaterialIcon
      color={props.color || colors.muted}
      size={props.size || 20}
      name={props.icon}
      style={[styles.icon, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {alignSelf: 'center'},
});

export default Icon;
