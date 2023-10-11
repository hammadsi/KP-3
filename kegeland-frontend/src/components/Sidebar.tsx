import { Box, Button, Divider, ScaleFade, VStack } from '@chakra-ui/react';
import {
  AiOutlineProfile,
  AiOutlineTeam,
  AiOutlinePlayCircle,
  AiOutlineRise,
  AiOutlineSetting,
} from 'react-icons/ai';

import { User } from '../state/ducks/auth/auth.interface';
import useAppDispatch from '../hooks/useAppDispatch';
import { signOutUser } from '../state/ducks/auth/auth.actions';
import { ThemeMode } from '../types';

import Menu from './Menu';
import UserAvatar from './UserAvatar';
import Logo from './Logo';
import { Link } from 'react-router-dom';

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
      transition="width 200ms, top 50ms">
      <ScaleFade in={isOpen}>
        <Box paddingY={2}>
          <Logo />
        </Box>
        <Divider borderColor={isDark ? 'whiteAlpha.400' : 'blackAlpha.400'} />
        <Menu title="Dashboard" mode={mode} head={<Link to="/myprofile"><UserAvatar user={user} /></Link>}>
          <Menu.Item
            mode={mode}
            title="Patients"
            to={'/'}
            icon={AiOutlineTeam}
          />
          <Menu.Item
            mode={mode}
            title="Game"
            to={'/game'}
            icon={AiOutlinePlayCircle}
          />
          <Menu.Item
            mode={mode}
            title="Edit Questionnaires"
            to={'/not-implemented'}
            icon={AiOutlineProfile}
          />
          <Menu.Item
            mode={mode}
            title="Edit Exercises"
            to={'/not-implemented'}
            icon={AiOutlineRise}
          />
          <Menu.Item
            mode={mode}
            title="Settings"
            to={'/not-implemented'}
            icon={AiOutlineSetting}
          />
        </Menu>
        <VStack width="full" transition="bottom 200ms">
          <Button
            width="full"
            variant="unstyled"
            transition="all 300ms"
            color="primary.600"
            _hover={{ color: 'primary.300' }}
            onClick={() => dispatch(signOutUser())}>
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
