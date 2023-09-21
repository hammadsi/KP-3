import React from 'react';
import Matter from 'matter-js';

import {render} from '~utils/test-utils';

import Player, {PlayerRenderer, PlayerProps} from '../Player.entity';
import constants from '../../constants';
import {Position} from '../../interface';

const {PLAYER_SIZE} = constants;
describe('Test Player-entity', () => {
  const pos: Position = {x: 100, y: 100};
  it('should render correctly', () => {
    const props: PlayerProps = {
      body: Matter.Bodies.rectangle(pos.x, pos.y, PLAYER_SIZE, PLAYER_SIZE, {
        label: 'Player',
        restitution: 0,
        density: 0.0025,
        frictionAir: 0.015,
      }),
    };
    const component = <PlayerRenderer {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should spawn the entity correctly', () => {
    const world = Matter.World.create({});
    const entity = Player(world, pos);
    expect(Object.keys(entity).sort()).toStrictEqual(
      ['body', 'renderer'].sort(),
    );
  });
});
