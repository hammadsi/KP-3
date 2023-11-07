import { PatientType, UserRole } from '../../auth/auth.interface';
import { Patient } from '../patients.interface';

const fetchPatentByIdResponse: Patient = {
  id: 'uid',
  email: 'olaf.eriksen@mail.com',
  roles: [UserRole.PATIENT],
  patientType: [PatientType.WHEELCHAIR],
  name: {
    lastName: 'Eriksen',
    firstName: 'Olaf',
  },
};

export default fetchPatentByIdResponse;
