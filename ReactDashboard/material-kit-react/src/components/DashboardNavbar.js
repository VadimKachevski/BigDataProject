// import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  // Badge,
  Box,
  Toolbar,
  Typography
} from '@material-ui/core';
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
// import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) =>
  (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        
        <Box sx={{ flexGrow: 0.5 }} />
        <Typography  align="center" variant="h2" noWrap>
            Big Data Dashboard
        </Typography>
        {/* <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden> */}
        {/* <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden> */}
      </Toolbar>
    </AppBar>
  );

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};
export default DashboardNavbar;
