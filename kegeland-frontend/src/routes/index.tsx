import { NonIndexRouteObject, Outlet, PathMatch } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ExercisePage from '../pages/ExercisePage';
import NotFoundPage from '../pages/NotFound';
import NotImplemented from '../pages/NotImplemented';
import PatientsPage from '../pages/PatientListPage';
import PatientPage from '../pages/PatientPage';
import Settings from '../pages/Settings';
import MyProfilePage from '../pages/profile/MyProfilePage';
import GamePage from '../pages/GamePage';
import { UserRole } from '../state/ducks/auth/auth.interface';
import ProtectedRoutes from '../components/ProtectedRoutes';
import useAppSelector from '../hooks/useAppSelector';
import EditProfilePage from '../pages/profile/EditProfilePage';
import PostQuestionnairePage from '../pages/PostQuestionnairePage';
import PreQuestionnairePage from '../pages/PreQuestionnairePage';

export interface RoutePathDefinition
  extends Omit<NonIndexRouteObject, 'children'> {
  title?: string;
  children?: RoutePathDefinition[];
  path: string;
  allowedRoles?: UserRole[];
}

export type RoutePath = {
  title: string;
  active: boolean;
  isParamRoute: boolean;
  match: PathMatch<string>;
};

function HomeRouter() {
  const { userDetails } = useAppSelector((state) => state.auth);
  console.log(userDetails?.roles[0]);
  if (userDetails?.roles.includes(UserRole.PHYSICIAN)) {
    return <PatientsPage />;
  }
  return <PatientPage />;
}

const routes: RoutePathDefinition[] = [
  {
    title: 'Home',
    path: '/',
    element: <HomeRouter />,
  },
  {
    title: 'Login',
    path: '/login',
    element: <LoginPage />,
  },
  {
    title: 'Register',
    path: '/register',
    element: <RegisterPage />,
  },
  {
    title: 'MyProfile',
    path: '/myprofile',
    element: (
      <ProtectedRoutes allowedRoles={[UserRole.PATIENT]}>
        <MyProfilePage />
      </ProtectedRoutes>
    ),
  },
  {
    title: 'EditProfile',
    path: '/editprofile',
    element: (
      <ProtectedRoutes allowedRoles={[UserRole.PATIENT]}>
        <EditProfilePage />
      </ProtectedRoutes>
    ),
  },
  {
    title: 'Not Implemented',
    path: 'not-implemented',
    element: <NotImplemented />,
  },
  {
    title: 'Settings',
    path: 'settings',
    element: <Settings />,
  },
  {
    path: '/game',
    element: (
      <ProtectedRoutes allowedRoles={[UserRole.PATIENT]}>
        <Outlet />
      </ProtectedRoutes>
    ),
    children: [
      {
        title: 'Game',
        path: '/game',
        element: <GamePage />,
      },
      {
        title: 'Pre',
        path: '/game/pre',
        element: <PreQuestionnairePage />,
      },
      {
        title: 'Post',
        path: '/game/post',
        element: <PostQuestionnairePage />,
      },
    ],
  },
  {
    path: '/patients/:patientId',
    element: (
      <ProtectedRoutes allowedRoles={[UserRole.PHYSICIAN]}>
        <Outlet />
      </ProtectedRoutes>
    ),
    children: [
      {
        title: 'Patient',
        path: '',
        element: <PatientPage />,
      },
      {
        title: 'Exercise',
        path: 'exercise/:exerciseId',
        element: <ExercisePage />,
      },
    ],
  },
  {
    title: '404',
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
