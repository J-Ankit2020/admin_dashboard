import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export default function DeleteButton({ BulkDeleteHandler }) {
  return (
    <Button color='white' bg='red' onClick={BulkDeleteHandler}>
      <DeleteIcon />
    </Button>
  );
}
