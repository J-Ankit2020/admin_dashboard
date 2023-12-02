import { Button, Checkbox, HStack, Input, Td, Tr } from '@chakra-ui/react';
import DeleteActionButton from './DeleteActionButton';
import PropTypes from 'prop-types';
import EditButton from './EditButton';
import { useState } from 'react';

export default function TableRow({
  value,
  editData,
  onDelete,
  selectRowHandler,
  selectedRows,
  toggleMasterCheckBox,
}) {
  const [editableRow, setEditableRow] = useState(false);
  const [editedData, setEditedData] = useState({});
  //   const [isSelected, setIsSelected] = useState(false);
  const isSelected = selectedRows.includes(value.id);
  const checkBoxChangeHandler = () => {
    if (isSelected) {
      selectRowHandler((selectRows) =>
        selectRows.filter((val) => val !== value.id)
      );
    } else selectRowHandler((selectRows) => [...selectRows, value.id]);
  };

  const handleCancelClick = () => {
    setEditedData({});
    setEditableRow(null); // Reset editable row without saving
  };

  const handleEditClick = () => {
    setEditableRow(true);
  };
  return (
    <Tr bg={isSelected ? 'gray.200' : ''}>
      <Td>
        <Checkbox
          onChange={checkBoxChangeHandler}
          isChecked={isSelected}
          colorScheme='green'
        />
      </Td>
      <Td>
        {editableRow ? (
          <Input
            defaultValue={value.name}
            onChange={(e) => {
              setEditedData((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
          />
        ) : (
          value.name
        )}
      </Td>
      <Td>
        {editableRow ? (
          <Input
            defaultValue={value.email}
            onChange={(e) => {
              setEditedData((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              });
            }}
          />
        ) : (
          value.email
        )}
      </Td>
      <Td>
        {editableRow ? (
          <Input
            defaultValue={value.role}
            onChange={(e) => {
              setEditedData((prev) => {
                return {
                  ...prev,
                  role: e.target.value,
                };
              });
            }}
          />
        ) : (
          value.role
        )}
      </Td>
      <Td>
        {editableRow ? (
          <HStack>
            <Button
              onClick={() => {
                editData(value.id, editedData);
                setEditableRow(null);
              }}
              colorScheme='green'
            >
              Save
            </Button>
            <Button onClick={handleCancelClick} colorScheme='red'>
              Cancel
            </Button>
          </HStack>
        ) : (
          <>
            <EditButton onClick={handleEditClick} />
            <DeleteActionButton
              onDelete={() => {
                toggleMasterCheckBox();
                onDelete();
              }}
              id={value.id}
            />
          </>
        )}
      </Td>
    </Tr>
  );
}

TableRow.propTypes = {
  value: PropTypes.object,
  onDelete: PropTypes.func,
  editData: PropTypes.func,
  selectedRows: PropTypes.array,
  selectRowHandler: PropTypes.func,
};
