import { useSelector } from 'react-redux';

import useWheelchairPatient from '../hooks/useWheelchairPatient';
import { RootState } from '../state/store';

const WheelchairPatientDetailsComponent = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  // Now TypeScript knows that authUser.id is defined, so no error should be thrown here
  const { wheelchairPatient, error, loading } = useWheelchairPatient(
    authUser?.id,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!wheelchairPatient) return <p>No patient found.</p>;

  const { name, age, gender, currentPhysicalState } = wheelchairPatient;
  const {
    height,
    weight,
    maxHeartRate,
    averageHeartRate,
    maxWheelchairSpeed,
    averageWheelchairSpeed,
  } = currentPhysicalState;

  return (
    <div>
      <h2>Patient Details</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Gender:</strong> {gender}
      </p>

      <h3>Current Physical State</h3>
      <p>
        <strong>Height:</strong> {height}
      </p>
      <p>
        <strong>Weight:</strong> {weight}
      </p>
      <p>
        <strong>Max Heart Rate:</strong> {maxHeartRate}
      </p>
      <p>
        <strong>Average Heart Rate:</strong> {averageHeartRate}
      </p>
      <p>
        <strong>Max Wheelchair Speed:</strong> {maxWheelchairSpeed}
      </p>
      <p>
        <strong>Average Wheelchair Speed:</strong> {averageWheelchairSpeed}
      </p>
    </div>
  );
};

export default WheelchairPatientDetailsComponent;
