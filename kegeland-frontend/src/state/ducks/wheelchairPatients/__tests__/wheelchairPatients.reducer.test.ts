import reducer, { initialState } from '../wheelchairPatients.reducer';
import { fetchWheelchairPatientById } from '../wheelchairPatients.actions';
import { WheelchairPatient } from '../wheelchairPatients.interface';

// Mock WheelchairPatient object
const mockWheelchairPatient: WheelchairPatient = {
  id: '123',
  name: 'John Doe',
  birthdate: '2000-09-28T12:00:00',
  gender: 'M',
  currentPhysicalState: {
    height: 175,
    weight: 70,
    maxHeartRate: 180,
    averageHeartRate: 75,
    maxWheelchairSpeed: 5,
    averageWheelchairSpeed: 3,
    id,
  },
  gameSessions: [
    {
      id: 'session1',
      startTime: new Date('2023-09-28T12:00:00'),
      endTime: new Date('2023-09-28T13:00:00'),
      exerciseTime: 60, // minutes, for example
      questionaires: {
        preGame: [
          {
            question: 'How are you feeling?',
            answer: 'Good',
          },
          // ... other preGame questions ...
        ],
        postGame: [
          {
            question: 'How was the session?',
            answer: 'Challenging',
          },
          // ... other postGame questions ...
        ],
      },
      laps: [
        {
          lapTime: 120, // seconds, for example
          timeStamp: new Date('2023-09-28T12:15:00'),
        },
        // ... other laps ...
      ],
      timeSeriesData: {
        heartRates: [
          {
            heartRate: 80,
            timestamp: new Date('2023-09-28T12:05:00'),
          },
          // ... other heartRates ...
        ],
        speeds: [
          {
            leftSpeed: 3,
            rightSpeed: 3,
            timestamp: new Date('2023-09-28T12:05:00'),
          },
          // ... other speeds ...
        ],
        imus: [
          {},
          // ... other imus ...
        ],
      },
      // ... other timeSeriesData ...
    },
    // ... other gameSessions ...
  ],
};

describe('wheelchairPatients reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle fetchWheelchairPatientById.pending', () => {
    expect(
      reducer(initialState, {
        type: fetchWheelchairPatientById.pending.type,
      }),
    ).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle fetchWheelchairPatientById.fulfilled', () => {
    expect(
      reducer(
        { ...initialState, loading: true },
        {
          type: fetchWheelchairPatientById.fulfilled.type,
          payload: mockWheelchairPatient,
        },
      ),
    ).toEqual({
      ...initialState,
      loading: false,
      wheelchairPatient: mockWheelchairPatient,
      error: null,
    });
  });

  it('should handle fetchWheelchairPatientById.rejected', () => {
    const error = 'An error occurred';

    expect(
      reducer(
        { ...initialState, loading: true },
        {
          type: fetchWheelchairPatientById.rejected.type,
          error: { message: error },
        },
      ),
    ).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });
});
