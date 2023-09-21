import exerciseMock from '../../__mocks__/exercise.mock';
import spawnEntities from '../spawnEntities';
describe('Test spawnEntities', () => {
  it('should spawn correct entities', () => {
    const res = spawnEntities(exerciseMock);
    expect(Object.keys(res).sort()).toStrictEqual(
      ['physics', 'exercise', 'player', 'ceil', 'floor'].sort(),
    );
  });
});
