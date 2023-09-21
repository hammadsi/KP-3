import React from 'react';
import Matter from 'matter-js';

import {render} from '~utils/test-utils';

import Coin, {CoinRenderer, CoinProps} from '../Coin.entity';
import constants from '../../constants';
import {Position} from '../../interface';

const {COIN_SIZE} = constants;

describe('Test Coin-entity', () => {
  const pos: Position = {x: 100, y: 100};
  it('should render correctly', () => {
    const props: CoinProps = {
      body: Matter.Bodies.rectangle(pos.x, pos.y, COIN_SIZE, COIN_SIZE, {
        label: 'coin_1',
        isSensor: true,
        isStatic: true,
      }),
      scored: false,
    };
    const component = <CoinRenderer {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should spawn the entity correctly', () => {
    const world = Matter.World.create({});
    const entity = Coin(world, pos, 'coin_1');
    expect(Object.keys(entity).sort()).toStrictEqual(
      ['body', 'scored', 'renderer'].sort(),
    );
  });
});
