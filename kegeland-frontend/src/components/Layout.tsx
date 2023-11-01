import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import withAuthUser, { WithAuthUserProps } from '../hoc/withAuthUser';
import useSilentRefresh from '../hooks/useSilentRefresh';

import Header from './Header';
import Sidebar from './Sidebar';

type LayoutProps = {
  children?: React.ReactNode;
} & WithAuthUserProps;

const Layout: React.FC<LayoutProps> = ({ user, children }) => {
  useSilentRefresh();
  const [isGreaterThanMd] = useMediaQuery('(min-width: 48em)');
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  useEffect(() => {
    if (!isGreaterThanMd && openSidebar) {
      setOpenSidebar(false);
    }

    if (isGreaterThanMd && !openSidebar) {
      setOpenSidebar(true);
    }
  }, [isGreaterThanMd]);

  const toggle = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Box minH="100%" minW="100%">
      <Flex flexDir="row">
        <Box position={isGreaterThanMd ? 'relative' : 'absolute'}>
          <Sidebar user={user} isOpen={openSidebar} />
        </Box>

        <Flex
          flexDir="column"
          h="100%"
          flexBasis={openSidebar ? 'calc(100% - 300px)' : '100%'}
          transition="flex-basis 100ms"
          justifyContent="flex-start">
          <Header toggleSidebar={toggle} isSidebarOpen={openSidebar} />
          <Flex
            zIndex={999}
            marginTop={{ base: 5, md: 0 }}
            padding={{ base: 0, md: 5 }}
            flexGrow={0}
            flexDir="column"
            overflowX="hidden"
            marginX="auto"
            w={{ base: '100%', md: '90%' }}
            maxW="8xl">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default withAuthUser(Layout);
