import { Name } from '../state/ducks/auth/auth.interface';

export const renderName = (name: Name) => {
  const { firstName, lastName } = name;
  return `${firstName} ${lastName}`;
};
