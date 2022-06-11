import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

const AddWeatherStationUser = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = () => {};
  return (
    <div style={{ marginBottom: '10px' }}>
      <Button onClick={handleOpen} variant="contained" size="small">
        Přidat uživatele
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Přidání uživatele
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ marginBottom: '20px' }}
          >
            Právě přidáváte další meteostanici pro tento workspace <br />
            <br />
            Kliknutím na tlačítko vygenerujte stanici a v ní můžete uživatelům
            přiřadit práva pro zobrazení.
          </Typography>
          <Grid align="center" style={{ marginBottom: '10px' }}>
            <TextField
              fullWidth
              label="Název stanice"
              placeholder="Enter your username"
              margin="normal"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={submit}
          >
            Přidat uživatele
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddWeatherStationUser;
