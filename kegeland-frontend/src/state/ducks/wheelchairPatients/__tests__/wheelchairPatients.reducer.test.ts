import reducer, { initialState } from '../wheelchairPatients.reducer';
import { fetchWheelchairPatientById } from '../wheelchairPatients.actions';
import { WheelchairPatient } from '../wheelchairPatients.interface';

// Mock WheelchairPatient object
const mockWheelchairPatient: WheelchairPatient = {
    
};

describe('wheelchairPatients reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle fetchWheelchairPatientById.pending', () => {
    expect(
      reducer(initialState, {
        type: fetchWheelchairPatientById.pending.type,
      })
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
        }
      )
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
        }
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });
});