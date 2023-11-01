import React from 'react';

import useAddEmptyGameSession from '../hooks/useAddEmptyGameSession';
import useUpdateGameSession from '../hooks/useUpdateGameSession';
import { WheelchairPatient } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

const mockWheelchairPatient: WheelchairPatient = {
  id: '2P9gfi0u1foJiyoK3ovJ',
  name: 'John Doe',
  birthdate: '1990-01-01',
  gender: 'M',
  currentPhysicalState: {
    height: 175, // in cm
    weight: 70, // in kg
    maxHeartRate: 180,
    averageHeartRate: 75,
    maxWheelchairSpeed: 15, // in km/h
    averageWheelchairSpeed: 7.5,
  },
  gameSessions: [
    {
      createdAt: Date.now(),
      id: '28ceabH5I9zm1BguEbcB',
      startTime: new Date(),
      endTime: new Date(),
      exerciseTime: 3600, // in seconds
      questionnaires: {
        preGame: [
          {
            question: 'How tired are you?',
            answer: 'Not tired',
            type: 'freeText',
          },
        ],
        postGame: [
          {
            question: 'How tired are you?',
            answer: 'Moderate',
            type: 'freeText',
          },
        ],
      },
      laps: [
        {
          lapTime: 120, // in seconds
          timestamp: new Date('2023-10-18T12:20:00'),
        },
      ],
      timeSeriesData: {
        heartRates: [
          {
            heartRate: 75,
            timestamp: new Date('2023-10-18T12:10:00'),
          },
        ],
        speeds: [
          {
            leftSpeed: 7,
            rightSpeed: 7,
            timestamp: new Date('2023-10-18T12:10:00'),
          },
        ],
        imus: [
          // Add your IMUData mock here
        ],
      },
    },
  ],
};

const AddGameSession: React.FC = () => {
  const {
    addGameSession,
    loading: addLoading,
    error: addError,
  } = useAddEmptyGameSession();
  const {
    updateSession,
    loading: updateLoading,
    error: updateError,
  } = useUpdateGameSession();

  const handleAddSession = () => {
    addGameSession(mockWheelchairPatient.id);
  };

  const handleUpdateSession = () => {
    // Get the latest game session (last in the array)
    const latestSession =
      mockWheelchairPatient.gameSessions[
        mockWheelchairPatient.gameSessions.length - 1
      ];

    if (latestSession) {
      updateSession({
        patientId: mockWheelchairPatient.id,
        id: latestSession.id,
        sessionData: latestSession,
      });
    } else {
      console.error('No game sessions found');
    }
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4CAF50', // Green background
    border: 'none',
    color: 'white', // White text
    padding: '10px 20px', // Some padding
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer', // Cursor changes when hovering
    borderRadius: '4px', // Rounded corners
    transition: '0.3s', // Transition for hover effect
  };

  const buttonDisabledStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#dddddd', // Greyed out background
    color: '#aaaaaa', // Greyed out text
    cursor: 'not-allowed', // No clicking cursor
  };

  return (
    <div>
      <h1>{mockWheelchairPatient.name}</h1>
      <p>Age: {mockWheelchairPatient.birthdate}</p>
      <p>Gender: {mockWheelchairPatient.gender}</p>
      {/* Render other details similarly */}

      <button
        onClick={handleAddSession}
        disabled={addLoading}
        style={addLoading ? buttonDisabledStyle : buttonStyle}>
        Add Empty Game Session
      </button>
      {addError && <p>Error: {addError}</p>}

      <button
        onClick={handleUpdateSession}
        disabled={updateLoading}
        style={updateLoading ? buttonDisabledStyle : buttonStyle}>
        Update Game Session
      </button>
      {updateError && <p>Error: {updateError}</p>}
    </div>
  );
};

export default AddGameSession;
