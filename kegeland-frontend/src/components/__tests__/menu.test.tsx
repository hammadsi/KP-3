import renderer from 'react-test-renderer';

import Menu from '../Menu';
import { userMock } from '../mocks/user.mock';
import UserAvatar from '../UserAvatar';

describe('Test manu', () => {
  it('renders correctly dark', () => {
    const tree = renderer.create(<Menu title={'hello'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly ligth', () => {
    const tree = renderer
      .create(
        <Menu
          title={'hello'}
          mode={'light'}
          head={<UserAvatar user={userMock} />}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
