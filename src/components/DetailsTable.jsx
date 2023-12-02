import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import Pagination from './Pagination';
import TableRow from './TableRow';

export default function DetailsTable({
  userDetails,
  onDelete,
  editData,
  selectedRows,
  setSelectedRows,
  setIsMasterCheckBoxSelected,
  isMasterCheckBoxSelected,
  toggleMasterCheckBox,
}) {
  const [page, setPage] = useState(1);

  function selectPageHandler(pageNo) {
    if (
      pageNo !== page &&
      pageNo >= 1 &&
      pageNo <= Math.ceil(userDetails.length / 10)
    ) {
      setSelectedRows([]);
      setIsMasterCheckBoxSelected(false);
      setPage(pageNo);
    }
  }

  const toggleSelectAll = () => {
    const currentPageRows = userDetails?.slice(page * 10 - 10, page * 10);
    const allSelected =
      selectedRows.length === currentPageRows.length &&
      currentPageRows.every((row) => selectedRows.includes(row.id));
    setIsMasterCheckBoxSelected((prev) => !prev);
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const newSelectedRows = currentPageRows.map((row) => row.id);
      setSelectedRows(newSelectedRows);
    }
  };

  return (
    <TableContainer>
      <Table size='md'>
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                onChange={toggleSelectAll}
                isChecked={isMasterCheckBoxSelected}
                colorScheme='green'
              />
            </Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userDetails?.slice(page * 10 - 10, page * 10).map((value) => {
            return (
              <TableRow
                key={value.id}
                value={value}
                editData={editData}
                onDelete={onDelete}
                selectRowHandler={setSelectedRows}
                selectedRows={selectedRows}
                toggleMasterCheckBox={toggleMasterCheckBox}
              />
            );
          })}
        </Tbody>
      </Table>
      <Pagination
        userDetails={userDetails}
        onPageChange={selectPageHandler}
        selectedPage={page}
      />
    </TableContainer>
  );
}

DetailsTable.propTypes = {
  userDetails: PropTypes.array,
  onDelete: PropTypes.func,
  editData: PropTypes.func,
  setSelectedRows: PropTypes.func,
  selectedRows: PropTypes.array,
};
