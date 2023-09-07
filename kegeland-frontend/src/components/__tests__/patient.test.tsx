import renderer from 'react-test-renderer';

import Patient from '../Patient';

describe('Test patient', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Patient name={'ola nordmann'} id={'userId'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
