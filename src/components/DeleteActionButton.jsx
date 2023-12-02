import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function DeleteActionButton({ onDelete, id }) {
  return (
    <Button
      color='red'
      ml={2}
      onClick={() => {
        onDelete(id);
      }}
    >
      <DeleteIcon />
    </Button>
  );
}
DeleteActionButton.propTypes = {
  onDelete: PropTypes.func,
  id: PropTypes.any,
};
