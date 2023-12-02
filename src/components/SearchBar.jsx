import { Box, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch }) {
  const changeHandler = (e) => {
    onSearch(e.target.value);
  };
  return (
    <Box w='20%' m={3}>
      <Input placeholder='Search Anything...' onChange={changeHandler} />
    </Box>
  );
}
SearchBar.propTypes = {
  onSearch: PropTypes.func,
};
