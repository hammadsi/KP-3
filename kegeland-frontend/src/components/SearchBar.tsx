import { Icon, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { ComponentProps } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

type SearchBarProps = ComponentProps<typeof Input>;

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <InputGroup>
      <Input {...props} />
      <InputRightAddon>
        <Icon as={AiOutlineSearch} />
      </InputRightAddon>
    </InputGroup>
  );
};

SearchBar.defaultProps = {
  type: 'search',
  placeholder: 'Search...',
};

export default SearchBar;
