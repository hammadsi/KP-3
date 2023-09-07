import { UserRole } from '../../auth/auth.interface';
import { Patient } from '../patients.interface';

const fetchPatentsResponseMock: Patient[] = [
  {
    id: 'uid',
    email: 'olaf.eriksen@mail.com',
    roles: [UserRole.PATIENT],
    name: {
      lastName: 'Eriksen',
      firstName: 'Olaf',
    },
  },
  {
    id: 'uid2',
    email: 'kari.thomasen@mail.com',
    roles: [UserRole.PATIENT],
    name: {
      lastName: 'Thomasen',
      firstName: 'Kari',
    },
  },
];

export default fetchPatentsResponseMock;
