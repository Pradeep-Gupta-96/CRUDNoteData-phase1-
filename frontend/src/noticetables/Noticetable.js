import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Edite from './Edite';
import { toast } from 'react-toastify';


//==============popup==========
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

export default function Noticetable() {
    const [data, setData] = useState([])
    const [id,setId]=useState()
    const revData = [...data].reverse()


    // popo up 
    const [open, setOpen] = useState(false);

    const handleClickOpen = (getId) => {
        setOpen(true);
        setId(getId)
    };
    const handleClose = () => {
        setOpen(false);
    };

// for get data==================
    const API = "http://localhost:4000/notes"
    const callApi = async (url) => {
        const res = await fetch(url)
        const result = await res.json()
        setData(result.Message)
    }
    useEffect(() => {
        callApi(API)
    }, [])
   
// for delete data===============
const forDelete = async (iddelete) => {
    try {
      const res = await fetch(`http://localhost:4000/notes/${iddelete}`, {method: "delete"})
      const result = await res.json()
      if (result.Message === "Done") {
        toast("deleted Successfull !", {
          position: "top-center",
          autoClose: 1000,
          type: "success"
        })
      }else{
        toast("something error!", {
          position: "top-center",
          autoClose: 1000,
          type: "error"
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 0 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow >
                                    <TableCell>Sr.No</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>From Email</TableCell>
                                    <TableCell>Template</TableCell>
                                    <TableCell>Created On</TableCell>
                                    <TableCell>Changes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    revData.map((item, index) => {
                                        return (
                                            <>
                                                <TableRow hover role="checkbox" tabIndex={-1} >
                                                    <TableCell >{index}</TableCell>
                                                    <TableCell >{item.name}</TableCell>
                                                    <TableCell >{item.email}</TableCell>
                                                    <TableCell >{item.template}</TableCell>
                                                    <TableCell >{item.createdAt}</TableCell>
                                                    <TableCell >
                                                        <IconButton color="primary" aria-label="delete" size="small" title='Edit!' onClick={()=>handleClickOpen(item._id)}>
                                                            <EditIcon fontSize="inherit" />
                                                        </IconButton>
                                                        <IconButton color="secondary" aria-label="delete" size="small" title='Delete!' onClick={()=>forDelete(item._id)}>
                                                            <DeleteIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    })
                                }
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Paper>
                {/* ========================================popup form for edited */}
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                       Edit Modal title
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom component={'span'}>
                            {/* ================================================  */}
                            <Edite id={id}/>

                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Save!
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </Box>
        </>
    );
}