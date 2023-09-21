import React from 'react';

import {render} from '~utils/test-utils';
import PlayerSpriteSheet from '~assets/femfit/bird.png';

import SpriteSheet, {SpriteSheetProps} from '../SpriteSheet';

describe('Test SpriteSheet-component', () => {
  it('should render correctly', () => {
    const props: SpriteSheetProps = {
      src: PlayerSpriteSheet,
      rows: 1,
      cols: 3,
      anims: [{name: 'default', row: 0, frames: 3}],
      defaultAnim: 'default',
    };
    const component = <SpriteSheet {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
