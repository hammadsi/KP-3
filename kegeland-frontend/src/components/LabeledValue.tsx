import { HStack, Icon, VStack, Text } from '@chakra-ui/react';
import { ComponentProps } from 'react';
import { IconType } from 'react-icons/lib';

type LabeledValueProps = {
  label: string;
  value: string | number;
  icon?: IconType;
  iconProps?: ComponentProps<typeof Icon>;
} & ComponentProps<typeof HStack>;

const LabeledValue: React.FC<LabeledValueProps> = ({
  label,
  value,
  icon,
  iconProps,
  ...props
}) => {
  return (
    <HStack {...props}>
      <VStack alignItems="flex-start" spacing={0}>
        <Text fontWeight="semibold" color="gray.800">
          {label}:
        </Text>
        <HStack spacing={0.5}>
          {icon && (
            <Icon as={icon} {...iconProps} color="primary.700" fontSize={18} />
          )}
          <Text marginBlockStart={0} marginBlockEnd={0} fontSize={14}>
            {value}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default LabeledValue;
