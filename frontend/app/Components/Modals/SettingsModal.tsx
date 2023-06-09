'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CustomButton from '../Button';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { UserAPI } from '@/app/api/UserAPI';
import { useEffect } from 'react';
import Cookies from "js-cookie";

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

var api = new UserAPI();
export default function SettingsModal() {

  const [uid, setuid] = React.useState<number>(() =>
  Cookies.get("userID") !== undefined
    ? (Cookies.get("userID") as unknown as number)
    : 0
  );

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
        api.changeSettings(uid, taxRate);

        }

    const handleTaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaxRate(Number(event.target.value));
        };

      
      useEffect(() => {
        api.getUser(uid).then((data) => {
            setTaxRate(data.taxRate);
        }
        );
      }, [open]);

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
     border-x-[2px] 
     sm:block
     w-24"  onClick={handleOpen}>Settings</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Stack spacing={1} className="flex items-center justify-center">
          <TextField className="w-28" id="outlined-basic" label="Tax Rate" variant="outlined" value={taxRate} onChange={handleTaxRateChange} 
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> 
          }}/> 
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