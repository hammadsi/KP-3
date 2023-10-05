import Card from '../components/Card';
import PatientsTable from '../components/PatientsTable';
import SearchBar from '../components/SearchBar';
import WheelchairPatientComponent from '../components/WheelchairPatient';
import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import usePatientList from '../hooks/usePatientList';

const PatientListPage: React.FC = () => {
  const { patients, loading, filterData } = usePatientList();

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
      <h1 style={headingStyle}>OVERVIEW OF YOUR PATIENTS</h1>
      <Card loading={loading} minH="36">
        <h2>Details for Specific Patient ID: J32eTqCIGlRKE3HX2WWtPry0piy2</h2>
        <WheelchairPatientComponent id={'J32eTqCIGlRKE3HX2WWtPry0piy2'} />
      </Card>

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
