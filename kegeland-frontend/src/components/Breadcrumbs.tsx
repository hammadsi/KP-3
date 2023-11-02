import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';

import { RoutePath } from '../routes';

type BreadcrumbsProps = {
  crumbs: RoutePath[];
} & React.ComponentProps<typeof Breadcrumb>;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs, ...props }) => {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Text color="gray.700">Home</Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {crumbs.map((crumb) => (
        <BreadcrumbItem key={crumb.match.pattern.path}>
          <BreadcrumbLink
            href={crumb.match.pathname}
            color={crumb.active ? 'primary.600' : 'gray.700'}>
            {crumb.active ? (
              <Text noOfLines={1} fontWeight="medium">
                {crumb.title}
              </Text>
            ) : (
              <Text
                noOfLines={1}
                maxW="40"
                width="full"
                wordBreak="break-all"
                fontWeight="normal">
                {crumb.title}
              </Text>
            )}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
