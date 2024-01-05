'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CustomButton from '../Button';
import { InputAdornment, Select, Stack, TextField, MenuItem, InputLabel } from '@mui/material';
import { UserAPI } from '@/app/api/UserAPI';
import { useEffect } from 'react';
import Cookies from "js-cookie";
import { SelectChangeEvent } from '@mui/material/Select';
import { UserContext } from '@/app/page';

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
  const User_context = React.useContext(UserContext);

    const [ open, setOpen ] = useState(false);
    const [ taxRate, setTaxRate ] = useState(0);
    const [ currency, setCurrency ] = useState('USD');


    const handleCurrencyChange = (event: SelectChangeEvent) => {
      //set jobrate as well
      const value = String(event.target.value);
      setCurrency(value);
     // props.rule.JobID = Number(event.target.value);
      };


    const handleOpen = () => {
        //api call to fetch jobs
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitChanges = () => {
      // api call here
      const currencyValue = Object.keys(currencyOptions).find(
        (key) => currencyOptions[key] === currency
      );
      if (currencyValue) {
        api.changeSettings(User_context.id, taxRate, currencyValue);
      }
    };

    const handleTaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaxRate(Number(event.target.value));
        };

      
      useEffect(() => {
        var userID = User_context.id;
        if(userID === 0 || userID === undefined || userID === null || open === false) 
        {
          return;
        }
        if(open)
          api.getUser(userID).then((data) => {
            setTaxRate(data.taxRate);
            console.log(data.currency)
            setCurrency(data.currency);
        }
        );
      }, [open, User_context.id]);



      interface CurrencyOption {
        [key: string]: string;
      }

      const currencyOptions: CurrencyOption = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        RUB: '₽',
        BTC: '฿',
        UAH: '₴',
        KZT: '₸',
        NOK: "kr",
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
            <Stack spacing={1} className="flex items-center justify-center" direction="row">
              <Stack >
                <InputLabel id="demo-simple-select-label">Tax Rate</InputLabel>
                <TextField className="w-28" id="outlined-basic" variant="outlined" value={taxRate} onChange={handleTaxRateChange} 
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> 
                }}/> 
              </Stack>
          <Stack>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
                  value={currency}
                  label="Rule type"
                  onChange={handleCurrencyChange}>
                          {Object.keys(currencyOptions).map((option) => (
                              <MenuItem key={option} value={option}>
                              {currencyOptions[option]}
                            </MenuItem>
                          ))}
            </Select>
          </Stack>
          </Stack>
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