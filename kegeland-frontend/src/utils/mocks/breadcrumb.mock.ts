export const routePathLoginMock = {
  title: 'Login',
  active: true,
  isParamRoute: false,
  match: {
    params: {},
    pathname: '/login',
    pathnameBase: '/login',
    pattern: {
      end: false,
      path: '/login',
    },
  },
};

export const routePathLoginFalseMock = {
  title: 'Login',
  active: false,
  isParamRoute: false,
  match: {
    params: {},
    pathname: '/login',
    pathnameBase: '/login',
    pattern: {
      end: false,
      path: '/login',
    },
  },
};

export const routePathPatientPatientIdMock = {
  title: 'Patient-patientId',
  active: true,
  isParamRoute: true,
  match: {
    params: {
      patientId: 'patientId',
    },
    pathname: '/patients/patientId',
    pathnameBase: '/patients/patientId',
    pattern: {
      end: false,
      path: '/patients/:patientId/',
    },
  },
};
