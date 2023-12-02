import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export default function DeleteButton({ BulkDeleteHandler }) {
  return (
    <Button
      colorScheme='red'
      onClick={BulkDeleteHandler}
      className='bulk_delete_btn'
      leftIcon={<DeleteIcon />}
    >
      Delete Selected
    </Button>
  );
}
