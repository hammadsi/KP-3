import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

export type SkeletonProps = {
  mode?: 'rounded' | 'square';
  width?: number;
  height?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
};

/**
 * Component for rendering a component skeleton while a component is rendering.
 * @param props the props
 * @see {@link SkeletonProps}
 */
const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {colors} = useTheme();
  const opacity = useRef(new Animated.Value(0.3));

  const style: ViewStyle = {
    width: props.width,
    height: props.height,
    borderRadius: props.mode === 'rounded' && props.width ? props.width / 2 : 0,
  };

  /**
   * Initiate animation
   */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.1,
          useNativeDriver: true,
          easing: Easing.cubic,
          duration: 0,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 1000,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.1,
          useNativeDriver: true,
          duration: 2000,
        }),
      ]),
    ).start();
  }, [opacity]);
  return (
    <Animated.View
      style={[
        {
          opacity: opacity.current,
          backgroundColor: colors.onSurface,
        },
        style,
        props.style,
      ]}>
      <View style={{}} />
      {props.children}
    </Animated.View>
  );
};

Skeleton.defaultProps = {
  mode: 'square',
};

export default Skeleton;
