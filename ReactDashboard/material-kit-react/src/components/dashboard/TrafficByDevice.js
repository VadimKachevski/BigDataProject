import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';

const TrafficByDevice = (props) => {
  const theme = useTheme();
  var carObj =  props.cartypesobj
  var datasetsarr = []
  var labelsarr = []
  if(props.cartypesobj != null)
  {
  for (const [key, value] of Object.entries(carObj)) {
    datasetsarr.push(value)
    labelsarr.push(key)
  }
}
  const data = {
    datasets: [
      {
        data: datasetsarr,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.green[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
        
      }
    ],
    labels: labelsarr
  };

  const options = {
    animation: false,
    cutoutPercentage: 50,
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  var maxval=1;
  if(datasetsarr.length > 0)
  {
  maxval = datasetsarr.reduce(reducer)
  }
  
  const devices = [
    {
      title: 'Truck',
      value: Math.round(((carObj['Truck']/maxval).toFixed(2))*100),
      icon: LocalShippingIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Bus',
      value: Math.round(((carObj['Bus']/maxval).toFixed(2))*100),
      icon: DirectionsBusIcon,
      color: colors.red[600]
    },
    {
      title: 'Van',
      value: Math.round((carObj['Van']/maxval).toFixed(2)*100),
      icon: AirportShuttleIcon,
      color: colors.orange[600]
    },
    {
      title: 'Private',
      value: Math.round((carObj['Private']/maxval).toFixed(2)*100),
      icon: DirectionsCarIcon,
      color: colors.green[600]
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Traffic by vehicle type" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrafficByDevice;
