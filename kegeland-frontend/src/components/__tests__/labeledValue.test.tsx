import renderer from 'react-test-renderer';

import LabeledValue from '../LabeledValue';

describe('Test labeled value', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<LabeledValue label={'label'} value={123} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
