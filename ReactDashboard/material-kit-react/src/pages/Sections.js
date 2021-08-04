import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/car/CustomerListResults';
import CustomerListToolbar from 'src/components/car/CustomerListToolbar';
import {useLocation} from 'react-router-dom';

const CustomerList = (props) => {
  const { state } = useLocation();
  var secid;
  if(state == null || state.sectionid == null)
  {
    secid="0"
  }
  else{
    secid=state.sectionid
  }
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
        <CustomerListToolbar section={secid}/>
        <Box sx={{ pt: 3 }}>
          <CustomerListResults section={secid} />
        </Box>
      </Container>
    </Box>
  </>
);}

export default CustomerList;
