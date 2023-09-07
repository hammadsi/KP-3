import React from 'react';
import {Badge as PaperBadge, useTheme} from 'react-native-paper';

export type BadgeProps = React.ComponentProps<typeof PaperBadge>;

/**
 * Component for rendering a badge.
 * @param props the props
 * @see {@link BadgeProps}
 * @see {@link Badge}
 */
const Badge: React.FC<BadgeProps> = (props) => {
  const {colors} = useTheme();
  return (
    <PaperBadge
      {...props}
      style={[
        {backgroundColor: colors.primary, color: colors.text},
        props.style,
      ]}
    />
  );
};

export default Badge;
