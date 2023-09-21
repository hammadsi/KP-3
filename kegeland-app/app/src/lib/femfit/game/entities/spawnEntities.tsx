import Matter from 'matter-js';

import constants from '../constants';
import {ExerciseScheme} from '../interface';

import Boundary from './Boundary.entity';
import Player from './Player.entity';

const {BASELINE, PLAYER_SIZE, MAX_WIDTH, BOUNDARY_HEIGHT} = constants;

/**
 * Spawns the in-game entities
 * @param exerciseScheme the exercise to use
 * @returns the game entities
 */
const spawnEntities = (exerciseScheme: ExerciseScheme): any => {
  const engine = Matter.Engine.create({enableSleeping: false});
  const world = engine.world;
  engine.gravity.y = 0;

  return {
    physics: {engine, world},
    exercise: {...exerciseScheme, currRep: 0, currStep: 0},
    ceil: Boundary(
      world,
      {x: MAX_WIDTH / 2, y: -BOUNDARY_HEIGHT / 2},
      'Ceiling',
    ),
    floor: Boundary(
      world,
      {x: MAX_WIDTH / 2, y: BASELINE + BOUNDARY_HEIGHT / 2},
      'Floor',
    ),
    player: Player(world, {x: 40, y: BASELINE - PLAYER_SIZE / 2}),
  };
};

export default spawnEntities;
