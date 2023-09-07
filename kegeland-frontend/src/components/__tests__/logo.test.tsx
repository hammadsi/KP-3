import renderer from 'react-test-renderer';

import Logo from '../Logo';

describe('Test logo', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
