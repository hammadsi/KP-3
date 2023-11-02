import { Box, Button, Divider, ScaleFade, VStack } from '@chakra-ui/react';
import {
  AiOutlineProfile,
  AiOutlineTeam,
  AiOutlinePlayCircle,
  AiOutlineRise,
  AiOutlineSetting,
  AiOutlineFund,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { User, UserRole } from '../state/ducks/auth/auth.interface';
import useAppDispatch from '../hooks/useAppDispatch';
import { signOutUser } from '../state/ducks/auth/auth.actions';
import { ThemeMode } from '../types';

import Menu from './Menu';
import UserAvatar from './UserAvatar';
import Logo from './Logo';

type SidebarProps = {
  user: User;
  mode?: ThemeMode;
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ user, mode, isOpen }) => {
  const dispatch = useAppDispatch();
  const isDark = mode === 'dark';

  return (
    <Box
      position="sticky"
      top={0}
      minH="100vh"
      height="full"
      alignSelf="stretch"
      bg="gray.700"
      width={isOpen ? '300px' : '0px'}
      paddingX={isOpen ? 2 : 0}
      maxW="300px"
      boxShadow="md"
      zIndex={1001}
      transition="width 200ms, top 50ms"
    >
      <ScaleFade in={isOpen}>
        <Box paddingY={2}>
          <Logo />
        </Box>
        <Divider borderColor={isDark ? 'whiteAlpha.400' : 'blackAlpha.400'} />
        <Menu
          title="Dashboard"
          mode={mode}
          head={
            <Link to="/myprofile">
              <UserAvatar user={user} />
            </Link>
          }
        >
          {user.roles.includes(UserRole.PHYSICIAN) && (
            <>
              <Menu.Item
                mode={mode}
                title="Patients"
                to={'/'}
                icon={AiOutlineTeam}
                isSelected={
                  window.location.pathname === '/' ||
                  window.location.pathname.startsWith('/patient')
                }
              />
              <Menu.Item
                mode={mode}
                title="Edit Questionnaires"
                to={'/not-implemented'}
                icon={AiOutlineProfile}
                isSelected={window.location.pathname === '/not-implemented'}
              />
              <Menu.Item
                mode={mode}
                title="Edit Exercises"
                to={'/not-implemented'}
                icon={AiOutlineRise}
                isSelected={window.location.pathname === '/not-implemented'}
              />
            </>
          )}
          {user.roles.includes(UserRole.PATIENT) && (
            <>
              <Menu.Item
                mode={mode}
                title="Exercises"
                to={'/'}
                icon={AiOutlineFund}
                isSelected={window.location.pathname === '/'}
              />
              <Menu.Item
                mode={mode}
                title="Game"
                to={'/game'}
                icon={AiOutlinePlayCircle}
                isSelected={window.location.pathname.startsWith('/game')}
              />
            </>
          )}
          <Menu.Item
            mode={mode}
            title="Settings"
            to={'/settings'}
            icon={AiOutlineSetting}
            isSelected={window.location.pathname === '/settings'}
          />
        </Menu>
        <VStack width="full" transition="bottom 200ms">
          <Button
            width="full"
            variant="unstyled"
            transition="all 300ms"
            color="primary.600"
            _hover={{ color: 'primary.300' }}
            onClick={() => dispatch(signOutUser())}
          >
            Sign out
          </Button>
        </VStack>
      </ScaleFade>
    </Box>
  );
};

Sidebar.defaultProps = {
  mode: 'dark',
};

export default Sidebar;
