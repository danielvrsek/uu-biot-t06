import React, { useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CreateUser from '../../../components/adminDashboard/CreateUser';
import Modal from '@mui/material/Modal';
import ApiClient from '../../../api/ApiClient';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
};

const AddUser = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submit = () => {
        ApiClient.addUserToCurrentWorkspace(username).then(() =>
            window.location.reload()
        );
        setOpen(false);
    };
    return (
        <div style={{ marginBottom: '10px' }}>
            <Button onClick={handleOpen} variant="contained" size="large" sx={{m: 1}}>
                Přidat uživatele
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateUser />
                </Box>
            </Modal>
        </div>
    );
};

export default AddUser;
