import Matter from 'matter-js';
import {filter} from 'lodash';

import * as utils from '../utils';
import exerciseMock from '../__mocks__/exercise.mock';
import Coin, {CoinRenderer} from '../entities/Coin.entity';
import Player from '../entities/Player.entity';
import {GameEntities, Position} from '../interface';
import constants from '../constants';
import spawnEntities from '../entities/spawnEntities';

const {COIN_SIZE, COINS_PER_SEC} = constants;
describe('Test femfit utils functions', () => {
  it('getMaxExerciseScore should return max score', () => {
    const res = utils.getMaxExerciseScore(exerciseMock);
    expect(res).toBe(2);
  });

  it('getEstimatedExerciseDuration should return the duration of the exercise', () => {
    const res = utils.getEstimatedExerciseDuration(exerciseMock);
    expect(res).toBe(2);
  });

  it('isCoinBody should return true if body is labeled with coin', () => {
    const pos: Position = {x: 100, y: 100};
    const world = Matter.World.create({});
    const entity = Coin(world, pos, 'coin_1');
    expect(utils.isCoinBody(entity.body)).toBeTruthy();
  });

  it('isCoinBody should return false if body is not labeled with coin', () => {
    const pos: Position = {x: 100, y: 100};
    const world = Matter.World.create({});
    const entity = Player(world, pos);
    expect(utils.isCoinBody(entity.body)).toBeFalsy();
  });

  it('shouldDeleteCoin should return true if a coin is scored', () => {
    const pos: Position = {x: 100, y: 100};
    const body = Matter.Bodies.rectangle(pos.x, pos.y, COIN_SIZE, COIN_SIZE, {
      label: 'coin_1',
      isSensor: true,
      isStatic: true,
    });
    const entity = {body, scored: true, renderer: CoinRenderer};
    expect(utils.shouldDeleteCoin(entity)).toBeTruthy();
  });

  it('shouldDeleteCoin should return false if a coin is not scored', () => {
    const pos: Position = {x: 100, y: 100};
    const body = Matter.Bodies.rectangle(pos.x, pos.y, COIN_SIZE, COIN_SIZE, {
      label: 'coin_1',
      isSensor: true,
      isStatic: true,
    });
    const entity = {body, scored: false, renderer: CoinRenderer};
    expect(utils.shouldDeleteCoin(entity)).toBeFalsy();
  });

  it('shouldDeleteCoin should return true if a coin is out of bounds', () => {
    const pos: Position = {x: -5, y: 100};
    const body = Matter.Bodies.rectangle(pos.x, pos.y, COIN_SIZE, COIN_SIZE, {
      label: 'coin_1',
      isSensor: true,
      isStatic: true,
    });
    const entity = {body, scored: false, renderer: CoinRenderer};
    expect(utils.shouldDeleteCoin(entity)).toBeTruthy();
  });

  it('spawnCoins should spawn coins to the world', () => {
    const entities: GameEntities = spawnEntities(exerciseMock);
    const physics = entities.physics;
    const denominator = 1000 / COINS_PER_SEC;
    const numCoins = Math.trunc(exerciseMock.data[0][1] / denominator);
    utils.spawnCoins(physics.engine, entities, 0, exerciseMock.data[0]);
    expect(
      filter(Object.keys(entities), (item) =>
        item.toString().startsWith('coin_'),
      ).length,
    ).toBe(numCoins);

    expect(
      filter(physics.world.bodies, (item) => item.label.startsWith('coin_'))
        .length,
    ).toBe(numCoins);
  });
});
