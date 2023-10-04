import { Box, Flex, Icon, useMediaQuery, Text, HStack } from '@chakra-ui/react';
import { MdMenu, MdChevronLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import useBreadcrumbs from '../hooks/useBreadcrumbs';

import Breadcrumbs from './Breadcrumbs';

type HeaderProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const { crumbs } = useBreadcrumbs();
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');
  const moveBtn = isSidebarOpen && !isGreaterThanLg;
  return (
    <Box
      display="flex"
      paddingX={4}
      width={'100%'}
      height={'60px'}
      flexDirection="row"
      alignItems="center"
      bgColor="white"
      boxShadow="md"
      zIndex={1000}>
      <Flex
        flexDir="row"
        zIndex={999}
        overflow="hidden"
        marginX="auto"
        w="100%"
        maxW="8xl"
        justify="space-between"
        align="stretch">
        <Flex justify="center" align="center">
          <Icon
            as={MdMenu}
            onClick={toggleSidebar}
            position={moveBtn ? 'absolute' : 'relative'}
            left={moveBtn ? '300px' : 0}
            color="primary.600"
            transform="all 300ms"
            _hover={{ cursor: 'pointer', color: 'primary.700' }}
            aria-label="Toggle sidebar"
            width="40px"
            height="40px"
          />
          {isGreaterThanLg && crumbs.length > 0 && (
            <Breadcrumbs marginLeft={4} crumbs={crumbs} />
          )}
        </Flex>
        <Flex justify="end" flex={1} flexGrow={1}>
          {crumbs.length > 0 && (
            <HStack
              spacing={0}
              onClick={() => navigate(-1)}
              color="primary.600"
              transform="color 300ms"
              _hover={{ cursor: 'pointer', color: 'primary.700' }}>
              <Icon
                as={MdChevronLeft}
                aria-label="Toggle sidebar"
                width="24px"
                height="24px"
              />
              <Text fontWeight="semibold">Go back</Text>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
