import { UserRole } from '../../state/ducks/auth/auth.interface';

export const userMock = {
  id: 'userid',
  email: 'ole.nordmann@gmail.com',
  name: { firstName: 'ola', lastName: 'Nordmann' },
  roles: [UserRole.PATIENT],
};
