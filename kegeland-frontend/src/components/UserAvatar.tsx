import { Wrap, WrapItem, Avatar, Text } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

import { User } from '../state/ducks/auth/auth.interface';
import { ThemeMode } from '../types';
import { renderName } from '../utils/renderName';

type UserAvatarProps = {
  user: User;
  mode?: ThemeMode;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user, mode }) => {
  const isDark = mode === 'dark';
  return (
    <Wrap>
      <WrapItem alignItems="center">
        <Avatar
          size="xs"
          bg="primary.600"
          color="white"
          name={renderName(user.name)}
          icon={<AiOutlineUser />}
        />
        <Text
          paddingLeft={1}
          fontWeight={'semibold'}
          color={isDark ? 'gray.200' : 'gray.700'}
        >
          {renderName(user.name)}
        </Text>
      </WrapItem>
    </Wrap>
  );
};

UserAvatar.defaultProps = {
  mode: 'dark',
};

export default UserAvatar;
