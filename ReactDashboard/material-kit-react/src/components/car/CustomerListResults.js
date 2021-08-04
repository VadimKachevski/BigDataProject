import { useState,useContext,useEffect } from 'react';
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
import {SocketContext} from 'src/context/socket';

const CustomerListResults = ({ section, ...rest }) => {
  const socket = useContext(SocketContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [carList, setCarList] = useState([]);
  if(section==null)
  {
    section="0"
  }
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };
  useEffect(() => {
    socket.emit("getCarsBySectionID", section);
    socket.on("updateCarsBySection", (msg) => {
        var obj = JSON.parse(msg)
        setCarList(obj)
      });
    return () => {
      socket.off("updateCarsBySection")
    }
  }, [])

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
              {carList.slice(page*limit, page*limit+limit).map((car) => (
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
        count={carList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  section: PropTypes.string.isRequired
};

export default CustomerListResults;
