import React from 'react';
import { useSelector } from 'react-redux';

import useWheelchairPatient from '../hooks/useWheelchairPatient';
import { RootState } from '../state/store';

const GameSessions: React.FC = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { wheelchairPatient, error, loading } = useWheelchairPatient(
    authUser?.id,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (
    !wheelchairPatient ||
    !wheelchairPatient.gameSessions ||
    wheelchairPatient.gameSessions.length === 0
  ) {
    return <p>No game sessions found.</p>;
  }

  return (
    <div>
      <h3>Game Sessions</h3>
      {wheelchairPatient.gameSessions.map((session, index) => (
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

          <h5>Pre-Game Questionnaires</h5>
          <ul>
            {Array.isArray(session.questionnaires?.preGame) ? (
              session.questionnaires.preGame.map((q, qIndex) => (
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
            {Array.isArray(session.questionnaires?.postGame) ? (
              session.questionnaires.postGame.map((q, qIndex) => (
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
                  Lap Time: {lap.lapTime} seconds | Timestamp:{' '}
                  {new Date(lap.timestamp).toLocaleString()}
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
                  Heart Rate: {hr.heartRate} bpm | Timestamp:{' '}
                  {new Date(hr.timestamp).toLocaleString()}
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
                  Left Speed: {speed.leftSpeed} | Right Speed:{' '}
                  {speed.rightSpeed} | Timestamp:{' '}
                  {new Date(speed.timestamp).toLocaleString()}
                </li>
              ))
            ) : (
              <li>No Speed data available.</li>
            )}
          </ul>

          {/* ... Add more session details if needed */}
        </div>
      ))}
    </div>
  );
};

export default GameSessions;
