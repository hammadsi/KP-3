import Matter from 'matter-js';
import {GameEngineUpdateEventOptionType} from 'react-native-game-engine';

export type Position = {
  x: number;
  y: number;
};

export type EntityBase = {
  body: Matter.Body;
};

export type ExerciseScheme = {
  name: string;
  description: string;
  repetitions: number;
  data: [number, number][];
};

export type GameEntities = {
  [key: string]: EntityBase & {[key: string]: any};
} & {
  physics: {
    engine: Matter.Engine;
    world: Matter.World;
  };
  exercise: ExerciseScheme & {currRep: number; currStep: number};
};

export type IGameEngineSystem = (
  entities: GameEntities,
  update: GameEngineUpdateEventOptionType,
) => GameEntities;
