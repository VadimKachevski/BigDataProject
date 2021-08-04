import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// import Budget from 'src/components/dashboard//Budget';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import CarSectionsGraph from 'src/components/dashboard/carSectionsGraph';
// import TasksProgress from 'src/components/dashboard//TasksProgress';
// import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import Carcard from 'src/components/dashboard/carCard';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import React, { useEffect,useContext, useState,useRef } from "react";

import {SocketContext} from 'src/context/socket';
// import socketIOClient from "socket.io-client";

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const Dashboard = () => {
  
  const [socket, setSocket] = useState(useContext(SocketContext))
  // const [carAmout, setCarAmout] = useState([0, 0, 0, 0, 0, 0])
  // const [carType, setCarType] = useState({"Truck":0,"Bus":0,"Van":0,"Private":0})
  // const [newCarInfo, setCarInfo] = useState(null)
  const [updateCar, setUpdateCar] = useState({"carAmountBySection":[0, 0, 0, 0, 0, 0],"carAmountByType":{"Truck":0,"Bus":0,"Van":0,"Private":0},"newCars":{}})
  const prevCarInfo = usePrevious(updateCar.newCars);
  // useEffect(() => {
  //   socket.on("update", (msg) => {
  //       var obj = JSON.parse(msg)
  //       setCarAmout(obj)
  //     });
  //   
  //   return () => {
  //     socket.off("update")
  //     socket.disconnect()
  //   }
  // }, [])

  // useEffect(() => {
  //   socket.on("updateCarTypes",(msg) =>{
  //     var obj = JSON.parse(msg)
  //     setCarType(obj)
  //   });
  //   return () => {
  //     socket.off("updateCarTypes")
  //     socket.disconnect()
  //   }
  //  }, [])

  //  useEffect(() => {
  //     socket.on("newCarInfo",(msg) =>{
  //     //console.log(prevCarInfo)
  //     var obj = JSON.parse(msg)
  //     setCarInfo(obj)
  //   });
  //   return () => {
  //     socket.off("newCarInfo")
  //     socket.disconnect()
  //   }
  //  }, [])

   useEffect(() => {
    socket.emit("firstLoad", "yep");
    socket.on("updateCar", (msg) => {
        //console.log(msg)
        var obj = JSON.parse(msg)
        setUpdateCar(obj)
      });
    //socket.emit("firstLoad", "yep");
    return () => {
      socket.off("updateCar")
      // socket.disconnect()
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Dashboard | Big Data Project</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={0.3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={2}
              xs={12}
            >
              <Carcard roadid="0" cars={updateCar.carAmountBySection} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={2}
              xs={12}
            >
              <Carcard roadid="1" cars={updateCar.carAmountBySection} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={2}
              xs={12}
            >
              <Carcard roadid="2" cars={updateCar.carAmountBySection} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={2}
              xs={12}
            >
              <Carcard roadid="3" cars={updateCar.carAmountBySection} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={2}
              xs={12}
            >
              <Carcard roadid="4" cars={updateCar.carAmountBySection} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={2}
              xs={12}
            >
              <Carcard roadid="5" cars={updateCar.carAmountBySection} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <CarSectionsGraph caramount = {updateCar.carAmountBySection}/>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <TrafficByDevice cartypesobj={updateCar.carAmountByType} sx={{ height: '100%' }} />
            </Grid>
            {/* <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <LatestProducts sx={{ height: '100%' }} />
            </Grid> */}
            <Grid
              item
              lg={8}
              md={12}
              xl={12}
              xs={12}
            >
              <LatestOrders prevcar={prevCarInfo} newcarinfo={updateCar.newCars} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Dashboard;
