'use client';

import * as React from 'react';
import { UserAPI } from '@/app/api/UserAPI';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import CustomButton from '../Button';
import { IBackEndUser } from '@/app/Helper/Modules';

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

var userAPI = new UserAPI();

export default function RegisterModal() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
  }

  if(password.length < 8){
      alert("Password must be at least 8 characters");
      return;
  }

  
  if(!password.match(/[0-9]/)) {
      alert("Password must contain a number");
      return;
  }

  //checks if password contains an uppercase letter
  if(!password.match(/[A-Z]/)) {
      alert("Password must contain an uppercase letter");
      return;
  }

  if(!email.match((/[@]/)))
  {
      alert("Please enter a valid email");
      return;
  }

    var user:IBackEndUser = {
      Email: email,
      Password: password,
      UiD: 0,
      Taxrate: 0,
      Currency: "NOK"
    }

    //some rules to check if password and confirm password match
    //and valid email
     userAPI.registerUser(user).then((response) => {
      if(response.status !== 200){
        alert("User already exists");
      }
    });
      
    handleClose();
  }

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
}

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
  }


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
     w-24"  onClick={handleOpen}>Register</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Stack spacing={3} justifyContent="center" alignItems="center">
            <div className="text-center">
              <div className="text-2xl font-bold">
                Welcome to paytrack
              </div>
              <div className="font-light text-neutral-500 mt-2">
                Create new account
              </div>
            </div>
            <TextField sx={{m: 1, width:'35ch' }} value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" />
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleNewPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={handleConfirmPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
            <CustomButton 
            outline 
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
          />

            <CustomButton 
            outline 
            label = "Register"
            onClick={handleSubmit}
          />

          </Stack>

        </Box>
      </Modal>
    </div>
  );
}