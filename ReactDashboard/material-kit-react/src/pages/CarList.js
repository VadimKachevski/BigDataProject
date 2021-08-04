import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CarListResults from 'src/components/car/CarListResults';
//import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import {useNavigate,useLocation} from 'react-router-dom';

const CarList = (props) => {
  const { state } = useLocation();
  console.log(state);
  return(
  <>
    <Helmet>
      <title>All new cars list</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        {/* <CustomerListToolbar /> */}
        <Box sx={{ pt: 3 }}>
          <CarListResults newCars={state.carArray} />
        </Box>
      </Container>
    </Box>
  </>
);}

export default CarList;
