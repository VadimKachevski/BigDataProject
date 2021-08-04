import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

const CarListResults = ({ newCars, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };
  

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  In Section
                </TableCell>
                <TableCell>
                  Car Type
                </TableCell>
                <TableCell>
                  Day
                </TableCell>
                <TableCell>
                  Car Brand
                </TableCell>
                <TableCell>
                  Car Color
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newCars.slice(page*limit, page*limit+limit).map((car) => (
                <TableRow
                  hover
                  key={car.carduuid}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {car.inSection}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {car.carType}
                  </TableCell>
                  <TableCell>
                    {car.day}
                  </TableCell>
                  <TableCell>
                    {car.brand}
                  </TableCell>
                  <TableCell>
                    {car.color}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={newCars.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CarListResults.propTypes = {
  newCars: PropTypes.array.isRequired
};

export default CarListResults;
