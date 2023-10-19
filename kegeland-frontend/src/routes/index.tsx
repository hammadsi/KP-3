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
import EditProfile from '../pages/profile/EditProfilePage';
import GamePage from '../pages/GamePage';
import { UserRole } from '../state/ducks/auth/auth.interface';
import ProtectedRoutes from '../components/ProtectedRoutes';

export interface RoutePathDefinition extends Omit<NonIndexRouteObject, 'children'> {
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

const routes: RoutePathDefinition[] = [
  {
    title: 'Home',             
    path: '/',
    element: <PatientsPage />,
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
        <MyProfilePage />
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
    title: 'Game',             
    path: '/game',
    element: (
      <ProtectedRoutes allowedRoles={[UserRole.PATIENT]}>
        <GamePage />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/patients/:patientId',   // kun fysio
    element:(
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
    title: '404',             // begge
    path: '*',
    element: <NotFoundPage />,
  },
];


export default routes;
