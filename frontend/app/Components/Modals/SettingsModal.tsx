'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CustomButton from '../Button';
import { Stack, TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function SettingsModal() {
    const [ open, setOpen ] = useState(false);
    const [ taxRate, setTaxRate ] = useState(0);


    const handleOpen = () => {
        //api call to fetch jobs
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitChanges = () => {
        //api call here

        }

    const handleTaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaxRate(Number(event.target.value));
        };


  return (
    <div>
       {/* style this button */}
      <Button className="bg-rose-300
     text-black 
     font-semibold 
     px-4 
     text-sm
     hidden
     hover:bg-gray-300
     flex-center 
     text-center 
     border-x-[1px] 
     sm:block
     w-24"  onClick={handleOpen}>Settings</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Stack spacing={1} >
          <TextField id="outlined-basic" label="Tax Rate" variant="outlined" value={taxRate} onChange={handleTaxRateChange}/> 
         <CustomButton
            onClick={handleSubmitChanges}
            label="Submit Changes"
            outline
            />
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}