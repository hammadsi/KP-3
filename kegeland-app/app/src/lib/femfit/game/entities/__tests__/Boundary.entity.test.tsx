import React from 'react';
import Matter from 'matter-js';

import {render} from '~utils/test-utils';

import Boundary, {BoundaryRenderer, BoundaryProps} from '../Boundary.entity';
import constants from '../../constants';
import {Position} from '../../interface';

const {MAX_WIDTH, BOUNDARY_HEIGHT} = constants;
describe('Test Boundary-entity', () => {
  const pos: Position = {x: 100, y: 100};
  it('should render correctly', () => {
    const props: BoundaryProps = {
      body: Matter.Bodies.rectangle(pos.x, pos.y, MAX_WIDTH, BOUNDARY_HEIGHT, {
        label: 'Test Boundary',
        isStatic: true,
        density: 1,
      }),
    };
    const component = <BoundaryRenderer {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should spawn the entity correctly', () => {
    const world = Matter.World.create({});
    const entity = Boundary(world, pos, 'Test');
    expect(Object.keys(entity).sort()).toStrictEqual(
      ['body', 'renderer'].sort(),
    );
  });
});
