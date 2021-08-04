
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import {useNavigate} from 'react-router-dom';


var latestcars = []

const LatestOrders = (props) => {
  const navigate = useNavigate();
  var carobj =props.newcarinfo
  // console.log(carobj)
  // console.log(props.prevcar)
  // console.log("-------------------------")
  for (const property in carobj) {
    // console.log(`${property}: ${object[property]}`);
    latestcars.unshift(carobj[property])
  }
  // console.log(latestcars)
  return (
  <Card {...props}>
    <CardHeader title="Latest vehicles" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                In Section
              </TableCell>
              <TableCell>
                Car Type
              </TableCell>
              <TableCell >
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
            {latestcars.slice(0,5).map((car) => (
              <TableRow
                hover
                key={car.carduuid}
              >
                <TableCell>
                  {car.inSection}
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >

      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
        onClick={()=> navigate("/app/newCars",{state:{carArray:latestcars}})}
        
      >
        View all
      </Button>
    </Box>
  </Card>
);
    };

export default LatestOrders;
