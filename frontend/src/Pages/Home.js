import React, { useState } from 'react'
import { Box, styled, Fab, AppBar, Toolbar, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import AddNotice from './AddNotice';
import Noticetable from '../noticetables/Noticetable';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  right: 0,
  marginLeft: "auto"
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 6 }}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#01579b", color: "#ffffff" }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                  Home
                </Typography>
                <StyledFab color="medium" aria-label="add" title="Click Me! || add notice" onClick={handleClickOpen} >
                  <AddIcon color="#3e2723" />
                </StyledFab>
              </Toolbar>
            </AppBar>

            {/*================== popup from=============================  */}

            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Modal title
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom component={'span'}>
                  {/* ================================================  */}
                  <AddNotice />

                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Save!
                </Button>
              </DialogActions>
            </BootstrapDialog>
            
          </Box>

          {/* =============================================table notice==========  */}
          <Noticetable />

        </Box>
      </Box>
    </>
  )
}



export default Home