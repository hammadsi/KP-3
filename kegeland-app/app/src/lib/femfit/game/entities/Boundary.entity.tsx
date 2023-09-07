import React from 'react';
import Matter from 'matter-js';
import {View} from 'react-native';

import constants from '../constants';
import {EntityBase, Position} from '../interface';

import styles from './styles';

const {MAX_WIDTH, BOUNDARY_HEIGHT} = constants;
export type BoundaryProps = EntityBase;

/**
 * Boundary entity. Representing in-game boundaries like walls, floors and ceils
 * @see {@link BoundaryProps}
 */
export class BoundaryRenderer extends React.Component<BoundaryProps> {
  render(): React.ReactNode {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <View
        style={[
          styles.entity,
          {
            left: x,
            top: y,
            width,
            height,
          },
        ]}
      />
    );
  }
}

/**
 * Renders the boundary entity
 * @param world the world
 * @param pos the position
 * @param label the label
 */
export default (world: Matter.World, pos: Position, label: string) => {
  const body = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    MAX_WIDTH,
    BOUNDARY_HEIGHT,
    {
      label,
      isStatic: true,
      density: 1,
    },
  );
  Matter.World.add(world, body);
  return {body, renderer: BoundaryRenderer};
};
