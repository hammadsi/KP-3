import React from 'react';
import { useSelector } from 'react-redux';

import useWheelchairPatient from '../hooks/useWheelchairPatient';
import { RootState } from '../state/store';

const DisplayGameSessionsDemo: React.FC = () => {
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

  // Inline styles
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
    marginBottom: '20px',
  };

  const cellStyle: React.CSSProperties = {
    border: '1px solid #e0e0e0',
    padding: '8px 12px',
  };

  const alternatingRowStyle: React.CSSProperties = {
    backgroundColor: '#f9f9f9',
  };

  const questionnaireTableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
    marginBottom: '10px',
  };

  const questionnaireCellStyle: React.CSSProperties = {
    border: '1px solid #e0e0e0',
    padding: '5px 10px',
  };

  return (
    <div>
      <h3>Game Sessions</h3>
      {wheelchairPatient.gameSessions.map((session, index) => (
        <div key={session.id}>
          <h4>Session {index + 1}</h4>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Session ID</th>
                <th style={cellStyle}>Start Time</th>
                <th style={cellStyle}>End Time</th>
                <th style={cellStyle}>Exercise Time</th>
              </tr>
            </thead>
            <tbody>
              <tr style={index % 2 === 1 ? alternatingRowStyle : {}}>
                <td style={cellStyle}>{session.id}</td>
                <td style={cellStyle}>
                  {new Date(session.startTime).toLocaleString()}
                </td>
                <td style={cellStyle}>
                  {new Date(session.endTime).toLocaleString()}
                </td>
                <td style={cellStyle}>{session.exerciseTime}</td>
              </tr>
            </tbody>
          </table>

          <h5>Pre-Game Questionnaires</h5>
          <table style={questionnaireTableStyle}>
            <thead>
              <tr>
                <th style={questionnaireCellStyle}>Question</th>
                <th style={questionnaireCellStyle}>Answer</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(session.questionaires?.preGame) ? (
                session.questionaires.preGame.map((q, qIndex) => (
                  <tr key={qIndex}>
                    <td style={questionnaireCellStyle}>{q.question}</td>
                    <td style={questionnaireCellStyle}>{q.answer}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} style={questionnaireCellStyle}>
                    No Pre-Game Questionnaires available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h5>Post-Game Questionnaires</h5>
          <table style={questionnaireTableStyle}>
            <thead>
              <tr>
                <th style={questionnaireCellStyle}>Question</th>
                <th style={questionnaireCellStyle}>Answer</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(session.questionaires?.postGame) ? (
                session.questionaires.postGame.map((q, qIndex) => (
                  <tr key={qIndex}>
                    <td style={questionnaireCellStyle}>{q.question}</td>
                    <td style={questionnaireCellStyle}>{q.answer}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} style={questionnaireCellStyle}>
                    No Post-Game Questionnaires available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DisplayGameSessionsDemo;
