import { EditIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export default function EditButton({ onClick }) {
  return (
    <Button onClick={() => onClick()} className='edit_btn'>
      <EditIcon />
    </Button>
  );
}
