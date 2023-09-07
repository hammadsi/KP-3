import React from 'react';
import Matter from 'matter-js';

import PlayerSpriteSheet from '~assets/femfit/bird.png';

import {EntityBase, Position} from '../interface';
import constants from '../constants';
import SpriteSheet from '../SpriteSheet';

import styles from './styles';

const {PLAYER_SIZE} = constants;
export type PlayerProps = EntityBase;

/**
 * Player entity
 * @see {@link PlayerProps}
 */
export class PlayerRenderer extends React.Component<PlayerProps> {
  render(): React.ReactNode {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    return (
      <SpriteSheet
        src={PlayerSpriteSheet}
        rows={1}
        cols={3}
        anims={[{name: 'default', row: 0, frames: 3}]}
        defaultAnim="default"
        style={[styles.entity, {left: x, top: y, width, height}]}
      />
    );
  }
}

/**
 * Renders the player entity
 * @param world the world
 * @param pos the position
 */
export default (world: Matter.World, pos: Position) => {
  const body = Matter.Bodies.rectangle(pos.x, pos.y, PLAYER_SIZE, PLAYER_SIZE, {
    label: 'Player',
    restitution: 0,
    density: 0.0025,
    frictionAir: 0.015,
    isSleeping: false,
  });
  Matter.World.add(world, body);
  return {body, renderer: PlayerRenderer};
};
