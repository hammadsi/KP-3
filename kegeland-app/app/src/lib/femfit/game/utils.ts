import Matter from 'matter-js';

import Coin, {CoinProps} from './entities/Coin.entity';

import constants from './constants';
import {ExerciseScheme, GameEntities, Position} from './interface';

const {MAX_WIDTH, BASELINE, COIN_SIZE, PLAYER_SIZE, COINS_PER_SEC} = constants;

/**
 * Calculates the max exercise score from an exercise
 * @param exercise the exercise
 * @returns max exercise score
 */
export const getMaxExerciseScore = (exercise: ExerciseScheme) => {
  const {data, repetitions} = exercise;
  const denominator = 1000 / COINS_PER_SEC;
  return (
    (data.reduce((prev, curr) => prev + curr[1], 0) / denominator) * repetitions
  );
};

/**
 * Calculates the exercise duration from an exercise
 * @param exercise the exercise
 * @returns exercise duration
 */
export const getEstimatedExerciseDuration = (exercise: ExerciseScheme) => {
  const {data, repetitions} = exercise;
  return (data.reduce((prev, curr) => prev + curr[1], 0) / 1000) * repetitions;
};

/**
 * Checks whether or not a Matter.js body is a coin entity
 * @param body the body
 * @returns true if it is a coin
 */
export const isCoinBody = (body: Matter.Body) => {
  return body.isSensor && body.label.startsWith('coin_');
};

/**
 * Checks whether or not the coin should be removed from the game
 * @param coin the game
 * @returns true if the coin should be removed
 */
export const shouldDeleteCoin = (coin: CoinProps) =>
  coin.scored || coin.body.position.x < 0;

/**
 * Spawn coins to the game
 * @param engine the game engine
 * @param entities the current in-game entities
 * @param pointer the current index point for coins
 * @param data the current exercise phase
 * @returns new pointer
 */
export const spawnCoins = (
  engine: Matter.Engine,
  entities: GameEntities,
  pointer: number,
  data: [number, number],
) => {
  const [level, ms] = data;
  const denominator = 1000 / COINS_PER_SEC;
  const numCoins = Math.trunc(ms / denominator);
  for (let i = 0; i < numCoins; i++) {
    pointer++;
    const label = `coin_${pointer}`;
    const pos: Position = {
      x: MAX_WIDTH + COIN_SIZE * 2 * i,
      y: BASELINE - BASELINE * level - PLAYER_SIZE / 2,
    };
    entities[label] = Coin(engine.world, pos, label);
  }
  return pointer;
};
