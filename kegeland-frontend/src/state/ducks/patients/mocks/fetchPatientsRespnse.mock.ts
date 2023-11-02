import { PatientType, UserRole } from '../../auth/auth.interface';
import { Patient } from '../patients.interface';

const fetchPatentsResponseMock: Patient[] = [
  {
    id: 'uid',
    email: 'olaf.eriksen@mail.com',
    roles: [UserRole.PATIENT],
    patientType: [PatientType.WHEELCHAIR],
    name: {
      lastName: 'Eriksen',
      firstName: 'Olaf',
    },
  },
  {
    id: 'uid2',
    email: 'kari.thomasen@mail.com',
    roles: [UserRole.PATIENT],
    patientType: [PatientType.FEMFIT],
    name: {
      lastName: 'Thomasen',
      firstName: 'Kari',
    },
  },
];

export default fetchPatentsResponseMock;
