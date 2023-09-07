/* eslint-disable no-case-declarations */
import Matter from 'matter-js';

import {isAndroid} from '~utils/platform.utils';

import {CoinProps} from './entities/Coin.entity';

import constants from './constants';
import {IGameEngineSystem} from './interface';
import {isCoinBody, shouldDeleteCoin, spawnCoins} from './utils';

let coinPointer = 0;
let canSpawn = true;
let finished = false;

const {MAX_WIDTH, GRAVITY, BASELINE, PLAYER_SIZE} = constants;

const speedMultiplier = isAndroid() ? 1 : 0.5;

/**
 * Function for handling the game logic
 * @param entities the game entities
 * @param param1 the update information
 * @see {@link IGameEngineSystem}
 */
const Physics: IGameEngineSystem = (entities, {time, events, dispatch}) => {
  const engine = entities.physics.engine;
  const player = entities.player.body;
  const exercise = entities.exercise;

  /**
   * Handle in-game events
   */
  events.forEach((event) => {
    switch (event.type) {
      case 'reset':
        coinPointer = 0;
        canSpawn = true;
        finished = false;
        break;
      case 'move_up':
        const yCoeff = (BASELINE - player.position.y) / BASELINE;
        const force = -25 * (event.value - yCoeff);
        Matter.Body.setVelocity(player, {x: 0, y: force});
        break;
    }
  });

  /**
   * Handle the in-game coin entities
   */
  Object.keys(entities).forEach((key) => {
    if (key.indexOf('coin_') === 0) {
      // Remove coin if it should be deleted
      if (shouldDeleteCoin(entities[key] as CoinProps)) {
        Matter.World.remove(engine.world, entities[key].body);
        delete entities[key];
      } else {
        // Move the coin to the left
        Matter.Body.translate(entities[key].body, {
          x: -4 * speedMultiplier,
          y: 0,
        });
        // Check if the game can spawn new coins
        if (!canSpawn) {
          if (
            key === `coin_${coinPointer}` &&
            entities[key].body.position.x < MAX_WIDTH / 2
          ) {
            if (exercise.currRep === exercise.repetitions) {
              finished = true;
            } else {
              canSpawn = true;
            }
          }
        }
      }
    }
  });

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, 'afterUpdate', () => {
    // Set gravity
    switch (true) {
      // Player is at baseline
      case player.position.y > BASELINE - 3 && player.position.y < BASELINE + 3:
        Matter.Body.setVelocity(player, {x: 0, y: 0});
        engine.gravity.y = 0;
        break;
      // Player is above baseline
      case player.position.y < BASELINE:
        engine.gravity.y = GRAVITY;
        break;
      // Player is below baseline
      default:
        Matter.Body.setPosition(player, {
          x: player.position.x,
          y: BASELINE - PLAYER_SIZE / 2,
        });
    }

    // Dispatch 'game over'-event when the number of repetitions is reached
    if (finished && !(`coin_${coinPointer}` in entities)) {
      dispatch({type: 'game_over'});
    }

    if (canSpawn) {
      canSpawn = false;

      coinPointer = spawnCoins(
        engine,
        entities,
        coinPointer,
        exercise.data[exercise.currStep],
      );

      // Increment exercise step index
      exercise.currStep = (exercise.currStep + 1) % exercise.data.length;

      // If next index is the first step, increment repetition counter
      if (exercise.currStep === 0) {
        exercise.currRep++;
      }
    }
  });

  /**
   * Check for collisions between the player and coins
   */
  Matter.Events.on(engine, 'collisionStart', (e) => {
    for (const pair of e.pairs) {
      const {bodyA, bodyB} = pair;
      if (!bodyA.isSensor && !bodyB.isSensor) {
        continue;
      }
      const coin = isCoinBody(bodyB) ? bodyB : bodyA;
      if (coin.label in entities) {
        if (!entities[coin.label].scored) {
          dispatch({type: 'score'});
          entities[coin.label].scored = true;
        }
      }
    }
  });

  return entities;
};

export default Physics;
