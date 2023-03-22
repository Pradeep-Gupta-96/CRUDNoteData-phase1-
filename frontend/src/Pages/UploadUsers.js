import React from 'react'
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Navbar from '../Navbar/Navbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  right: 0,
  marginLeft: "auto"
});

const UploadUsers = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 6 }}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Upload Users!
                </Typography>
                <StyledFab color="secondary" aria-label="add">
                  <DriveFolderUploadIcon />
                </StyledFab>
              </Toolbar>
            </AppBar>
          </Box>
        </Box>
      </Box>

    </>
  )
}



export default UploadUsers