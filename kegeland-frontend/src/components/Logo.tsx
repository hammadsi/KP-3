import { Heading } from '@chakra-ui/react';

const Logo: React.FC = () => {
  return (
    <Heading
      as="h1"
      fontSize={26}
      letterSpacing={3}
      textTransform="uppercase"
      fontWeight="thin"
      color="primary.700"
    >
      <span style={{ fontWeight: '600' }}>NTNU</span> Physiotherapy
    </Heading>
  );
};

export default Logo;
