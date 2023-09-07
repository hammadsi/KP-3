import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';

import CoinSprite from '~assets/femfit/gold.png';
import Icon from '~components/Icon';

import constants from '../constants';
const {HEADER_HEIGHT, COIN_SIZE} = constants;

export type HeaderProps = {
  score: number;
  toggle: () => void;
};

/**
 * Component for rendering the game header panel
 * @param param0 the props
 * @see {@link HeaderProps}
 */
const Header: React.FC<HeaderProps> = ({score, toggle}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.header,
        {height: HEADER_HEIGHT, backgroundColor: colors.surface},
      ]}>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
        <Image
          style={styles.scoreSprite}
          source={CoinSprite}
          resizeMode="stretch"
        />
      </View>
      <View>
        <TouchableOpacity onPress={toggle}>
          <Icon icon="menu" color={colors.primary} size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    zIndex: 1000,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreSprite: {
    marginLeft: 8,
    width: COIN_SIZE,
    height: COIN_SIZE,
  },
});

export default Header;
