import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {List, useTheme} from 'react-native-paper';

import Icon from './Icon';
import ListItemSkeleton from './ListItemSkeleton';

export type ListItemProps = Omit<
  React.ComponentProps<typeof List.Item>,
  'onLongPress'
> & {
  icon?: string;
  iconSize?: number;
  iconStyle?: StyleProp<TextStyle>;
  isRoute?: boolean;
  loading?: boolean;
  onLongPress?: () => void;
  render?: (props: {
    color: string;
    style?:
      | {
          marginRight: number;
          marginVertical?: number | undefined;
        }
      | undefined;
  }) => React.ReactNode;
};

/**
 * Component for rendering a list item.
 * @param props the props
 * @see {@link ListItemProps}
 * @see {@link List.Item}
 */
const ListItem: React.FC<ListItemProps> = ({
  icon,
  iconSize,
  iconStyle,
  isRoute,
  loading,
  onLongPress,
  render,
  ...props
}) => {
  const {colors} = useTheme();
  const handleOnPress =
    props.onPress || onLongPress
      ? () => {
          if (onLongPress) return () => null;
          return props.onPress && props.onPress();
        }
      : undefined;

  const handleOnLongPress = onLongPress
    ? () => {
        return onLongPress && onLongPress();
      }
    : undefined;

  return loading ? (
    <ListItemSkeleton />
  ) : (
    <List.Item
      {...props}
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}
      delayLongPress={500}
      left={
        icon
          ? () => (
              <Icon
                color={colors.primary}
                icon={icon as string}
                size={iconSize}
                style={iconStyle}
              />
            )
          : undefined
      }
      title={props.title}
      right={
        isRoute
          ? ({color}) => <Icon color={color} icon="chevron-right" />
          : render
      }
    />
  );
};

ListItem.defaultProps = {
  iconSize: 24,
};

export default ListItem;
