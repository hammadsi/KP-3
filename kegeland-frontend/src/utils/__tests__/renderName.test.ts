import { renderName } from '../renderName';

describe('Test render name utils', () => {
  it('renderName should Ola Nordmann', () => {
    const view = renderName({ firstName: 'Ola', lastName: 'Nordmann' });
    expect(view).toEqual('Ola Nordmann');
  });
});
