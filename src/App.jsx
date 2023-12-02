import { Box, HStack, Heading } from '@chakra-ui/react';
import SearchBar from './components/SearchBar';
import DeleteButton from './components/DeleteButton';
import DetailsTable from './components/DetailsTable';
import { useEffect, useState } from 'react';

export default function App() {
  const [data, setdata] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [isMasterCheckBoxSelected, setIsMasterCheckBoxSelected] =
    useState(false);

  async function BulkDeleteHandler() {
    setdata((prevData) => {
      return prevData.filter((userData) => !selectedRows.includes(userData.id));
    });
    setIsMasterCheckBoxSelected((prev) => !prev);
  }

  function searchHandler(text) {
    setSearchText(text);
  }
  async function fetchData() {
    const res = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    );
    const Data = await res.json();
    setdata(Data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  let filteredData = data.filter((user) =>
    Object.values(user)
      .map((value) => String(value).toLowerCase())
      .some((field) => field.includes(searchText.toLowerCase()))
  );

  function editData(id, editedData) {
    const updatedUserDetails = data.map((user) =>
      user.id === id ? { ...user, ...editedData } : user
    );

    // Update the state with the edited data
    setdata(updatedUserDetails);
  }

  function deleteHandler(id) {
    setdata((prev) => {
      return prev.filter((data) => data.id !== id);
    });
  }

  return (
    <Box borderColor={'black'}>
      <Heading textAlign={'center'} p={4}>
        Admin Dashboard
      </Heading>
      <HStack
        justifyContent={'space-between'}
        mx='auto'
        alignItems={'center'}
        p={4}
        m={4}
      >
        <SearchBar onSearch={searchHandler} />
        <DeleteButton BulkDeleteHandler={BulkDeleteHandler} />
      </HStack>
      <DetailsTable
        userDetails={filteredData}
        onDelete={deleteHandler}
        editData={editData}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        isMasterCheckBoxSelected={isMasterCheckBoxSelected}
        setIsMasterCheckBoxSelected={setIsMasterCheckBoxSelected}
      />
    </Box>
  );
}
