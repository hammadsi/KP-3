/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import constants from './constants';

const {SPRITE_SIZE} = constants;

type Animation = {
  name: string;
  row: number;
  frames?: number;
};

type InternalAnim = {
  frames: number;
  input: number[];
  output: number[];
  translateY: number;
};

type InternalAnims = {[key: string]: InternalAnim};

export type SpriteSheetProps = {
  src: any;
  rows: number;
  cols: number;
  rate?: number;
  anims: Animation[];
  defaultAnim: string;
  style?: StyleProp<ViewStyle>;
};

type SpriteSheetState = {
  time: Animated.Value;
  iAnims: InternalAnims;
  currAnim: string;
  size: number;
  loaded: boolean;
  playing: boolean;
};

/**
 * Component for rendering an animated sprite sheet
 * @see {@link SpriteSheetProps}
 * @see {@link SpriteSheetState}
 */
export default class SpriteSheet extends React.Component<
  SpriteSheetProps,
  SpriteSheetState
> {
  constructor(props: SpriteSheetProps) {
    super(props);
    const iAnims: InternalAnims = {
      [this.props.defaultAnim]: {
        frames: 0,
        input: [0, 0],
        output: [0, 0],
        translateY: 0,
      },
    };

    this.state = {
      time: new Animated.Value(1.0),
      iAnims,
      currAnim: this.props.defaultAnim,
      size: SPRITE_SIZE,
      loaded: false,
      playing: false,
    };
  }

  play() {
    this.state.time.setValue(0);
    Animated.timing(this.state.time, {
      toValue: this.state.iAnims[this.state.currAnim].frames - 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (!finished) {
        return;
      }

      if (!this.state.playing) {
        this.setState((prevState) => ({
          ...prevState,
          playing: true,
        }));
        this.play();
      } else {
        this.play();
      }
    });
  }

  stop() {
    this.state.time.stopAnimation();
  }

  generateInterpolationRanges(event: LayoutChangeEvent) {
    if (this.state.loaded) {
      return;
    }

    const size = event.nativeEvent.layout.height;

    const iAnims: InternalAnims = {};
    for (const anim of this.props.anims) {
      const nFrames = anim.frames ?? this.props.cols;

      const iAnim: InternalAnim = {
        frames: nFrames,
        input: getNumPairs(nFrames).slice(0, 2 * nFrames - 1),
        output: [0].concat(
          getNumPairs(nFrames - 1).map((i) => -(i + 1) * size),
        ),
        translateY: anim.row * size,
      };
      iAnims[anim.name] = iAnim;
    }

    this.setState(
      {
        ...this.state,
        iAnims,
        size,
        loaded: true,
      },
      () => {
        this.play();
      },
    );
  }

  render(): React.ReactNode {
    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={(event) => this.generateInterpolationRanges(event)}>
        <Animated.Image
          source={this.props.src}
          resizeMode="stretch"
          style={[
            styles.img,
            {
              opacity: this.state.playing ? 1 : 0,
              height: this.state.size,
              width: this.state.size * this.props.cols,
              transform: [
                {
                  translateX: this.state.time.interpolate({
                    inputRange: this.state.iAnims[this.state.currAnim].input,
                    outputRange: this.state.iAnims[this.state.currAnim].output,
                  }),
                },
                {translateY: this.state.iAnims[this.state.currAnim].translateY},
              ],
            },
          ]}
        />
      </View>
    );
  }
}

const getNumPairs = (length: number) => {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
    arr.push(i);
  }
  return arr;
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    overflow: 'hidden',
  },
  img: {},
});
