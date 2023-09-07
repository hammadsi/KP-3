import * as apiCaller from '~utils/apiCaller';
import {store} from '~state/store';
import {answerAfter, answerBefore} from '~state/ducks/__mocks__/questions.mock';

import {FetchQuestionnaireDTO, UploadAnswersDto} from '../questions.interface';
import {fetchQuestionnaire, uploadAnswers} from '../questions.actions';

describe('Test session-actions', () => {
  it('uploadAnswers should correctly POST @ "/questionnaires/:questionnaireId/answers"', async () => {
    const qid = '1';
    const data: UploadAnswersDto = {
      questionnaireId: qid,
      sessionId: '1',
      answers: [answerBefore, answerAfter],
    };

    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve());
    await store.dispatch(uploadAnswers(data));
    expect(apiSpy).toBeCalledTimes(data.answers.length);
    apiSpy.mock.calls.forEach((call, idx) => {
      const res = {
        url: `questionnaires/${qid}/answers`,
        data: {sessionId: '1', ...data.answers[idx]},
        method: 'POST',
      };
      expect(call[0]).toStrictEqual(res);
    });
  });

  it('fetchQuestionnaire should correctly GET @ "/questionnaires/assignments/:userId"', async () => {
    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve());
    const req: FetchQuestionnaireDTO = {userId: 'asdas3', sensor: 'femfit'};
    const {userId, ...params} = req;
    await store.dispatch(fetchQuestionnaire(req));
    expect(apiSpy).toBeCalledWith({
      url: `questionnaires/assignments/${userId}`,
      params,
      method: 'GET',
    });
  });
});
