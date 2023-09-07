import React, {Children} from 'react';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import {Divider, List, useTheme} from 'react-native-paper';

import Icon from './Icon';

export type AccordionProps = Omit<
  React.ComponentProps<typeof List.Accordion>,
  'expanded' | 'onPress' | 'left'
> & {
  icon?: string | React.ReactNode;
  iconSize?: number;
  iconStyle?: StyleProp<TextStyle>;
};

/**
 * Component for rendering an accordion menu.
 * This component has inbuilt functionality for hiding/displaying it's sub-components.
 * @param props the props
 * @see {@link AccordionProps}
 * @see {@link List.Accordion}
 */
const Accordion: React.FC<AccordionProps> = (props) => {
  const {colors} = useTheme();
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  /**
   * Render the an icon to the left if enabled
   */
  const renderLeft = () => {
    if (props.icon) {
      if (React.isValidElement(props.icon)) {
        return (
          <View
            style={[
              {width: props.iconSize, height: props.iconSize},
              styles.icon,
            ]}>
            {props.icon}
          </View>
        );
      } else {
        return (
          <Icon
            color={colors.primary}
            icon={props.icon as string}
            size={props.iconSize}
            style={props.iconStyle}
          />
        );
      }
    }
    return undefined;
  };

  return (
    <List.Accordion
      {...props}
      left={renderLeft}
      style={[
        {
          backgroundColor: colors.elevation.elevation1,
        },
        styles.accordion,
        props.style,
      ]}
      titleStyle={[{color: colors.text}, props.titleStyle]}
      expanded={expanded}
      onPress={handlePress}>
      {expanded && Children.toArray(props.children).length > 0 && <Divider />}
      <View style={[styles.content]}>{props.children}</View>
    </List.Accordion>
  );
};

Accordion.defaultProps = {
  iconSize: 24,
};

const styles = StyleSheet.create({
  accordion: {
    paddingHorizontal: 0,
    paddingLeft: 8,
  },
  icon: {
    justifyContent: 'center',
  },
  content: {
    paddingLeft: 12,
  },
});

export default Accordion;
