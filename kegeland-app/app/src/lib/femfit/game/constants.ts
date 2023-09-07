import {Dimensions} from 'react-native';

/**
 * Constants for the femfit game
 */
export default {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  BASELINE: Dimensions.get('screen').height * 0.6,
  COINS_PER_SEC: 1,
  HEADER_HEIGHT: 50,
  BOUNDARY_HEIGHT: 50,
  SPRITE_SIZE: 128,
  PLAYER_SIZE: 50,
  COIN_SIZE: 25,
  GRAVITY: 0.4,
};
