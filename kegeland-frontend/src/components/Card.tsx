import { Box, Skeleton } from '@chakra-ui/react';
import { ComponentProps } from 'react';

type CardProps = {
  loading?: boolean;
  containerProps?: ComponentProps<typeof Skeleton>;
} & ComponentProps<typeof Box>;

const Card: React.FC<CardProps> = ({
  loading,
  children,
  containerProps,
  ...props
}) => {
  return (
    <Box
      padding={4}
      backgroundColor="white"
      shadow="md"
      justify="center"
      align="center"
      borderRadius={5}
      marginBottom={5}
      {...props}>
      <Skeleton isLoaded={!loading} {...containerProps} h="100%" w="100%">
        {children}
      </Skeleton>
    </Box>
  );
};

export default Card;
