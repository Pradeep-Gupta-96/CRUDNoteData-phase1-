import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom'
import Setting from './Setting';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const itemsList = [
    {
      text: "Home",
      icon: <AddHomeWorkIcon  color="secondary"/>,
      forNavigation: () => { navigate('/') }

    },
    {
      text: "Upload Users",
      icon: <GroupAddIcon  color="primary"/>,
      forNavigation: () => { navigate('/uploadusers') }
    }
  ];


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/*================= brandname ===========*/}
      <AppBar position="fixed" sx={{ backgroundColor: "#3e2723", color: "#ffffff" }} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => { setOpen(!open) }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ARENESS
          </Typography>

          {/*================= Profile ===========*/}
          <Setting />
        </Toolbar>
      </AppBar>


      {/*================= Drawer ===========*/}
      <Drawer variant="permanent" open={open}  >
        <DrawerHeader  >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {itemsList.map((item, index) => {
          const { text, icon, forNavigation } = item;
          return (
            <>
              <List key={index}  sx={{ backgroundColor: "#3e2723", color: "#ffffff" }}>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={forNavigation}  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    {icon && <ListItemIcon 
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        
                      }}
                    >{icon}
                    </ListItemIcon>}
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          )
        })}
        <Divider />
      </Drawer>
      <DrawerHeader />
    </Box>
  );
}


// https://codesandbox.io/s/winter-brook-fnepe?file=/src/Drawer.jsx