export const usersServiceMock = {
  findAllPatients: jest.fn((x) => x),
  findOne: jest.fn((x) => x),
  getPatientOverview: jest.fn((x) => x),
  delete: jest.fn((x) => x),
};

export const sessionsServiceMock = {
  findOne: jest.fn((x) => x),
  findAll: jest.fn((x) => x),
  create: jest.fn((x) => x),
  update: jest.fn((x) => x),
  delete: jest.fn((x) => x),
};

export const sensorsServiceMock = {
  findOne: jest.fn((x) => x),
  findAll: jest.fn((x) => x),
  create: jest.fn((x) => x),
  update: jest.fn((x) => x),
  delete: jest.fn((x) => x),
};

export const questionnairesServiceMock = {
  assignQuestionnaire: jest.fn((x) => x),
  getAssignedQuestionnaire: jest.fn((x) => x),
  findAllQuestionnaires: jest.fn((x) => x),
  findOneQuestionnaire: jest.fn((x) => x),
  createQuestionnaire: jest.fn((x) => x),
  updateQuestionnaire: jest.fn((x) => x),
  deleteQuestionnaire: jest.fn((x) => x),
  findAllAnswers: jest.fn((x) => x),
  getAnswer: jest.fn((x) => x),
  createAnswer: jest.fn((x) => x),
  updateAnswer: jest.fn((x) => x),
  deleteAnswer: jest.fn((x) => x),
};

export const authServiceMock = {
  login: jest.fn((x) => x),
  logout: jest.fn((x) => x),
  register: jest.fn((x) => x),
  resetPassword: jest.fn((x) => x),
  refresh: jest.fn((x) => x),
};
