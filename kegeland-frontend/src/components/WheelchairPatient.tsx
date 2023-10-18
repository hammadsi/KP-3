import { useSelector } from 'react-redux';

import useWheelchairPatient from '../hooks/useWheelchairPatient';
import { RootState } from '../state/store';

const WheelchairPatientComponent = () => {
  // Access the auth state from Redux store
  const { authUser } = useSelector((state: RootState) => state.auth);

  // Now TypeScript knows that authUser.id is defined, so no error should be thrown here
  const { wheelchairPatient, error, loading } = useWheelchairPatient(
    authUser?.id,
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error: {error}</p>;
  }

  if (wheelchairPatient) {
    const { name, age, gender, currentPhysicalState, gameSessions } =
      wheelchairPatient;
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

        {gameSessions && gameSessions.length > 0 ? (
          <>
            <h3>Game Sessions</h3>
            {gameSessions.map((session, index) => (
              <div key={session.sessionId}>
                <h4>Session {index + 1}</h4>
                <p>
                  <strong>Session ID:</strong> {session.sessionId}
                </p>
                <p>
                  <strong>Start Time:</strong>{' '}
                  {new Date(session.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{' '}
                  {new Date(session.endTime).toLocaleString()}
                </p>
                <p>
                  <strong>Exercise Time:</strong> {session.exerciseTime}
                </p>
                {/* Add more properties as per requirement */}
              </div>
            ))}
          </>
        ) : (
          <p>No game sessions found.</p>
        )}
      </div>
    );
  }

  return <p>No patient found.</p>;
};

export default WheelchairPatientComponent;
