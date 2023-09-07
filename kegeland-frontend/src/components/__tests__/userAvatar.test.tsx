import renderer from 'react-test-renderer';

import { userMock } from '../mocks/user.mock';
import UserAvatar from '../UserAvatar';

describe('Test user avatar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<UserAvatar user={userMock} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
