import { VStack, Text, Divider, HStack, Icon, Box } from '@chakra-ui/react';
import { ComponentProps } from 'react';
import { IconType } from 'react-icons/lib';
import { Link, To } from 'react-router-dom';

import { ThemeMode } from '../types';

type MenuItemProps = {
  title: string;
  mode?: ThemeMode;
  to: To;
  icon?: IconType;
};

const Item: React.FC<MenuItemProps> = ({ title, mode, to, icon }) => {
  const isDark = mode === 'dark';
  return (
    <HStack
      spacing={1}
      marginBottom={2}
      width="full"
      _hover={{ cursor: 'pointer' }}>
      {icon && <Icon as={icon} color="primary.600" fontSize={24} />}
      <Link to={to}>
        <Text
          fontWeight="semibold"
          transition="all 300ms"
          color={isDark ? 'gray.200' : 'gray.700'}
          _hover={{ color: isDark ? 'gray.400' : 'gray.500' }}>
          {title}
        </Text>
      </Link>
    </HStack>
  );
};

Item.defaultProps = {
  mode: 'dark',
};

type MenuComponents = {
  Item: typeof Item;
};

type MenuProps = {
  title: string;
  mode?: ThemeMode;
  head?: React.ReactNode;
  children?: React.ReactNode;
} & ComponentProps<typeof VStack>;

const Menu: React.FunctionComponent<MenuProps> & MenuComponents = ({
  title,
  mode,
  head,
  children,
  ...props
}) => {
  const isDark = mode === 'dark';
  return (
    <VStack
      {...props}
      width="full"
      spacing={2}
      paddingTop={4}
      alignItems="flex-start">
      {head && <Box paddingBottom={2}>{head}</Box>}
      {head && (
        <Divider borderColor={isDark ? 'whiteAlpha.400' : 'blackAlpha.400'} />
      )}
      <Text
        color="primary.600"
        fontWeight="semibold"
        width="full"
        textTransform="uppercase">
        {title}
      </Text>
      {children}
      <Divider borderColor={isDark ? 'whiteAlpha.400' : 'blackAlpha.400'} />
    </VStack>
  );
};

Menu.defaultProps = {
  mode: 'dark',
};

Menu.Item = Item;

export default Menu;
