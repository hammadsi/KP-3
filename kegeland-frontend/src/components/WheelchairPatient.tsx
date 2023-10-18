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
                  <strong>Start Time:</strong> {new Date(session.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong> {new Date(session.endTime).toLocaleString()}
                </p>
                <p>
                  <strong>Exercise Time:</strong> {session.exerciseTime}
                </p>

                <h5>Pre-Game Questionnaires</h5>
                <ul>
                  {Array.isArray(session.questionaires?.preGame) ? (
                    session.questionaires.preGame.map((q, qIndex) => (
                      <li key={qIndex}>
                        Q: {q.question} | A: {q.answer}
                      </li>
                    ))
                  ) : (
                    <li>No Pre-Game Questionnaires available.</li>
                  )}
                </ul>

                <h5>Post-Game Questionnaires</h5>
                <ul>
                  {Array.isArray(session.questionaires?.postGame) ? (
                    session.questionaires.postGame.map((q, qIndex) => (
                      <li key={qIndex}>
                        Q: {q.question} | A: {q.answer}
                      </li>
                    ))
                  ) : (
                    <li>No Post-Game Questionnaires available.</li>
                  )}
                </ul>

                <h5>Laps</h5>
                <ul>
                  {Array.isArray(session.laps) ? (
                    session.laps.map((lap, lapIndex) => (
                      <li key={lapIndex}>
                        Lap Time: {lap.lapTime} seconds | Timestamp: {new Date(lap.timeStamp).toLocaleString()}
                      </li>
                    ))
                  ) : (
                    <li>No Laps data available.</li>
                  )}
                </ul>

                <h5>Heart Rates</h5>
                <ul>
                  {Array.isArray(session.timeSeriesData?.heartRates) ? (
                    session.timeSeriesData.heartRates.map((hr, hrIndex) => (
                      <li key={hrIndex}>
                        Heart Rate: {hr.heartRate} bpm | Timestamp: {new Date(hr.timestamp).toLocaleString()}
                      </li>
                    ))
                  ) : (
                    <li>No Heart Rates data available.</li>
                  )}
                </ul>

                <h5>Speeds</h5>
                <ul>
                  {Array.isArray(session.timeSeriesData?.speeds) ? (
                    session.timeSeriesData.speeds.map((speed, speedIndex) => (
                      <li key={speedIndex}>
                        Left Speed: {speed.leftSpeed} | Right Speed: {speed.rightSpeed} | Timestamp: {new Date(speed.timestamp).toLocaleString()}
                      </li>
                    ))
                  ) : (
                    <li>No Speed data available.</li>
                  )}
                </ul>

                {/* ... And so on for other data fields in the session. */}
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
