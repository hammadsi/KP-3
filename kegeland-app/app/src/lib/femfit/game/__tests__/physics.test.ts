import Matter from 'matter-js';
import {GameEngineUpdateEventOptionType} from 'react-native-game-engine';

import spawnEntities from '../entities/spawnEntities';
import Coin from '../entities/Coin.entity';
import Physics from '../physics';
import exerciseMock from '../__mocks__/exercise.mock';

describe('Test game physics', () => {
  it('should run without errors', () => {
    const entities = spawnEntities(exerciseMock);
    const update: GameEngineUpdateEventOptionType = {
      dispatch: jest.fn(),
      events: [{type: 'reset'}, {type: 'move_up'}],
      screen: {fontScale: 12, height: 100, width: 100, scale: 1},
      time: {current: 0, delta: 0, previous: 0, previousDelta: 0},
      touches: [],
    };

    expect(() => Physics(entities, update)).not.toThrow();
  });

  it('should move player up', () => {
    const spyFn = jest.spyOn(Matter.Body, 'setVelocity');
    const entities = spawnEntities(exerciseMock);
    const update: GameEngineUpdateEventOptionType = {
      dispatch: jest.fn(),
      events: [{type: 'move_up'}],
      screen: {fontScale: 12, height: 100, width: 100, scale: 1},
      time: {current: 0, delta: 0, previous: 0, previousDelta: 0},
      touches: [],
    };
    Physics(entities, update);
    expect(spyFn).toBeCalled();
  });

  it('should remove coin out of bounds', () => {
    const spyFn = jest.spyOn(Matter.World, 'remove');
    const entities = spawnEntities(exerciseMock);
    const coin = Coin(entities.physics.world, {x: -10, y: 100}, 'coin_0');
    entities.coin_0 = coin;
    const update: GameEngineUpdateEventOptionType = {
      dispatch: jest.fn(),
      events: [{type: 'move_up'}],
      screen: {fontScale: 12, height: 100, width: 100, scale: 1},
      time: {current: 0, delta: 0, previous: 0, previousDelta: 0},
      touches: [],
    };
    Physics(entities, update);
    expect(spyFn).toBeCalled();
    expect(Object.keys(entities)).not.toContain('coin_0');
  });

  it('should translate coins', () => {
    const spyFn = jest.spyOn(Matter.Body, 'translate');
    const entities = spawnEntities(exerciseMock);
    const coin0 = Coin(entities.physics.world, {x: 100, y: 100}, 'coin_0');
    const coin1 = Coin(entities.physics.world, {x: 100, y: 100}, 'coin_1');
    entities.coin_0 = coin0;
    entities.coin_1 = coin1;
    const update: GameEngineUpdateEventOptionType = {
      dispatch: jest.fn(),
      events: [{type: 'move_up'}],
      screen: {fontScale: 12, height: 100, width: 100, scale: 1},
      time: {current: 0, delta: 0, previous: 0, previousDelta: 0},
      touches: [],
    };
    Physics(entities, update);
    expect(spyFn).toBeCalledTimes(2);
  });
});
