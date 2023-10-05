import Card from '../components/Card';
import PatientsTable from '../components/PatientsTable';
import SearchBar from '../components/SearchBar';
//import WheelchairPatientComponent from '../components/WheelchairPatient';
import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import usePatientList from '../hooks/usePatientList';
import useWheelchairPatient from '../hooks/useWheelchairPatient';

const PatientListPage: React.FC = () => {
  const { patients, loading, filterData } = usePatientList();

  const { wheelchairPatient, error } = useWheelchairPatient('2P9gfi0u1foJiyoK3ovJ');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterData(event.target.value);
  };

  const headingStyle = {
    color: 'var(--chakra-colors-blackAlpha-800)',
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '10px',
  };

  return (
    <>
      {wheelchairPatient ? (
        <h2>{wheelchairPatient.patientId}</h2>
      ) : (
        <h2>Loading patient data...</h2>
      )}
      {/*
      <h1 style={headingStyle}>OVERVIEW OF YOUR PATIENTS</h1>
      <Card minH="36">
        <h2>Details for Specific Patient ID: J32eTqCIGlRKE3HX2WWtPry0piy2</h2>
        <WheelchairPatientComponent id={'2P9gfi0u1foJiyoK3ovJ'} />
      </Card>
      */}

      <Card loading={loading} padding={0}>
        <SearchBar
          placeholder="Search for patients.."
          onChange={handleSearch}
        />
      </Card>

      <Card loading={loading} minH="36">
        <PatientsTable patients={patients} />
      </Card>
    </>
  );
};

export default withLayout(withSpinner(PatientListPage));
