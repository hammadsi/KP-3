import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

import withQuestionnaire from '~hoc/withQuestionnaire';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {render} from '~utils/test-utils';

jest.useFakeTimers();
describe('Test withQuestionnaire-hoc', () => {
  const MockComponent: React.FC<any> = ({toggleQuestionnaire, ...props}) => {
    return (
      <View testID="content" {...props}>
        <Button testID="ToggleModalBtn" onPress={toggleQuestionnaire}>
          Modal
        </Button>
      </View>
    );
  };

  it('should render correctly', () => {
    const store = mockStore(initialStore);
    const Component = withQuestionnaire('femfit', MockComponent);
    const component = render(<Component />, {wrapperProps: {store}});
    expect(component.toJSON()).toMatchSnapshot();
  });
});
