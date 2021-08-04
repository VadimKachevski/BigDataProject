import {
  Box,
  Card,
  CardContent,
} from '@material-ui/core';
import React, { useEffect, useState,useRef,useContext } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {SocketContext} from 'src/context/socket';

const options = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
];

const CustomerListToolbar = (props) =>{
  const socket = useContext(SocketContext);
  const [selectedIndex, setSelectedIndex] = React.useState(props.section);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickListItem = (event) => {
     setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    socket.emit("getCarsBySectionID", index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
  <Box {...props} >
    <Box sx={{ mt: 1 }}>
      <Card >
        <CardContent sx={{display: 'flex',justifyContent: "center"}}> 
          <Box sx={{ maxWidth: 200}}>
          <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Choose a section"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Choose a section" secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
            }

export default CustomerListToolbar;
