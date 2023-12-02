import { Button, HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Pagination({
  userDetails,
  onPageChange,
  selectedPage,
}) {
  if (userDetails?.length > 0) {
    return (
      <HStack
        className='pagination'
        p={2}
        my={2}
        mx={5}
        justifyContent='flex-end'
      >
        <Button
          onClick={() => {
            onPageChange(selectedPage - 1);
          }}
        >
          Prev
        </Button>
        <>
          {[...Array(Math.ceil(userDetails?.length / 10))].map((_, index) => {
            return (
              <Button
                key={index}
                colorScheme={index + 1 === selectedPage ? 'blue' : 'gray'}
                className={classNames(`page_${index + 1}`, {
                  prev_page: index + 1 === selectedPage - 1,
                  last_page: index + 1 === Math.ceil(userDetails?.length / 10),
                  first_page: index + 1 === 1,
                  next_page: index + 1 === selectedPage + 1,
                })}
                onClick={() => {
                  onPageChange(index + 1);
                }}
              >
                {index + 1}
              </Button>
            );
          })}
        </>
        <Button
          onClick={() => {
            onPageChange(selectedPage + 1);
          }}
        >
          Next
        </Button>
      </HStack>
    );
  }
}
Pagination.propTypes = {
  userDetails: PropTypes.array,
  onPageChange: PropTypes.func,
  selectedPage: PropTypes.any,
};
