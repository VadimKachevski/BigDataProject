import { Helmet } from 'react-helmet';
import { Box, Container,Card } from '@material-ui/core';
//import CustomerListResults from 'src/components/customer/CustomerListResults';
import Table from 'src/components/Table/Table'
//import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import {useLocation} from 'react-router-dom';

const tableMain = (props) => {
  
  return(
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
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
        <Box sx={{ pt: 6 }}>
          <Card>
          <Table />
          </Card>
        </Box>
      </Container>
    </Box>
  </>
);}

export default tableMain;
