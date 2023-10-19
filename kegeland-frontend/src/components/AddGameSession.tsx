import React from 'react';
import useAddEmptyGameSession from '../hooks/useAddEmptyGameSession';
import useUpdateGameSession from '../hooks/useUpdateGameSession';
import { WheelchairPatient } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

const mockWheelchairPatient: WheelchairPatient = {
    id: "2P9gfi0u1foJiyoK3ovJ",
    name: "John Doe",
    age: 35,
    gender: 'M',
    currentPhysicalState: {
      height: 175,  // in cm
      weight: 70,   // in kg
      maxHeartRate: 180,
      averageHeartRate: 75,
      maxWheelchairSpeed: 15,  // in km/h
      averageWheelchairSpeed: 7.5,
    },
    gameSessions: [
      {
        sessionId: "28ceabH5I9zm1BguEbcB",
        startTime: new Date(),
        endTime: new Date(),
        exerciseTime: 3600,  // in seconds
        questionaires: {
          preGame: [
            {
              question: "How do you feel?",
              answer: "Good",
            }
          ],
          postGame: [
            {
              question: "How tired are you?",
              answer: "Moderate",
            }
          ]
        },
        laps: [
          {
            lapTime: 120,  // in seconds
            timeStamp: new Date('2023-10-18T12:20:00'),
          }
        ],
        timeSeriesData: {
          heartRates: [
            {
              heartRate: 75,
              timestamp: new Date('2023-10-18T12:10:00'),
            }
          ],
          speeds: [
            {
              leftSpeed: 7,
              rightSpeed: 7,
              timestamp: new Date('2023-10-18T12:10:00'),
            }
          ],
          imus: [
            // Add your IMUData mock here
          ]
        }
      }
    ]
  };
  

const AddGameSession: React.FC = () => {
  const { addGameSession, loading: addLoading, error: addError } = useAddEmptyGameSession();
  const { updateSession, loading: updateLoading, error: updateError } = useUpdateGameSession();

  const handleAddSession = () => {
    addGameSession(mockWheelchairPatient.id);
  };

  const handleUpdateSession = () => {
    // Get the latest game session (last in the array)
    const latestSession = mockWheelchairPatient.gameSessions[mockWheelchairPatient.gameSessions.length - 1];
    console.log('Is startTime a Date?', latestSession.startTime instanceof Date);

    if (latestSession) {
        updateSession({
            patientId: mockWheelchairPatient.id,
            sessionId: latestSession.sessionId,
            sessionData: latestSession,
        })
    } else {
        console.error("No game sessions found");
    }
  };

  return (
    <div>
      <h1>{mockWheelchairPatient.name}</h1>
      <p>Age: {mockWheelchairPatient.age}</p>
      <p>Gender: {mockWheelchairPatient.gender}</p>
      {/* Render other details similarly */}
      
      <button onClick={handleAddSession} disabled={addLoading}>
        Add Empty Game Session
      </button>
      {addError && <p>Error: {addError}</p>}

      <button onClick={handleUpdateSession} disabled={updateLoading}>
        Update Game Session
      </button>
      {updateError && <p>Error: {updateError}</p>}
    </div>
  );
};

export default AddGameSession;
