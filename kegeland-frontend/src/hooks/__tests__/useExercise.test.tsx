import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { map } from 'lodash';

import answerResponce from '../../state/ducks/questionnaires/mocks/answerResponse.mock';
import questionnairesResponce from '../../state/ducks/questionnaires/mocks/questionnairesResponse.mock';
import { sensorFemfitRespose } from '../../state/ducks/sensors/mocks/sensorsResponse.mock';
import { SensorType } from '../../state/ducks/sensors/sensors.interface';
import { mockStore } from '../../state/mocks/store.mock';
import * as apiCaller from '../../utils/apiCaller';
import useExercise from '../useExercise';
import sessionByIdResponce from '../../state/ducks/sessions/mocks/sessionByIdResponce.mock';
import { fetchSensor } from '../../state/ducks/sensors/sensors.actions';

describe('Test useExercise-hook', () => {
  beforeEach(() => {
    jest.spyOn(apiCaller, 'apiCaller').mockImplementation((config) => {
      if (config.url === `sensors/${SensorType.FEMFIT}`) {
        return Promise.resolve(sensorFemfitRespose);
      } else if (config.url === `questionnaires/assignments/patientId`) {
        return Promise.resolve(questionnairesResponce);
      } else if (
        config.url === `questionnaires/${questionnairesResponce.id}/answers`
      ) {
        return Promise.resolve(answerResponce);
      } else if (config.url === `sessions/${sessionByIdResponce.id}`) {
        return Promise.resolve(sessionByIdResponce);
      } else {
        return Promise.resolve();
      }
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should return sensor, questionnaires and answers', async () => {
    const store = mockStore();
    const { result } = renderHook(
      () => useExercise('patientId', sessionByIdResponce.id),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );
    await waitFor(() => {
      expect(map(store.getActions(), 'type')).toContain(
        fetchSensor.fulfilled.type,
      );
    });
    expect(result.current.sensor).toEqual(sensorFemfitRespose);
    expect(result.current.questionnaire).toEqual(questionnairesResponce);
    expect(result.current.answers).toEqual(answerResponce);
    expect(result.current.session).toEqual(sessionByIdResponce);
  });
});
