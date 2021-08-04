import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import HelpIcon from '@material-ui/icons/Help';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const Carcard = (props) => {
  // console.log(props)
  let avatar;
  switch(props.roadid)
  {
    case "0": avatar = <RadioButtonUncheckedIcon/>;
    break;
    case "1": avatar = <LooksOneIcon/>;
    break;
    case "2": avatar = <LooksTwoIcon/>;
    break;
    case "3": avatar = <Looks3Icon/>;
    break;
    case "4": avatar = <Looks4Icon/>;
    break;
    case "5": avatar = <Looks5Icon/>;
    break;
    default: avatar = <HelpIcon/>;
  }
  let amount = 0;
  if(props.cars != null)
  {
    amount = props.cars[props.roadid]
  }
  const navigate = useNavigate();
  return (
  <Card  onClick={()=> navigate("/app/sections",{state:{sectionid:props.roadid}})}>
    <CardContent >
      <Grid 
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item   >
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            Section id: {props.roadid}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {amount}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            {avatar}
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
          };
export default Carcard;
