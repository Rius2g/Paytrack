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
import { IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import CustomButton from '../Button';
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
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

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const failedLoginAttemptsCookie = Cookies.get('failedLoginAttempts');
    const failedLoginAttempts = failedLoginAttemptsCookie !== undefined ? parseInt(failedLoginAttemptsCookie) : 0;

    if (failedLoginAttempts >= 5) {
      alert("You have exceeded the maximum number of failed login attempts. Please try again later.");
      Cookies.set("timeOut", "true", { expires: 1 / 1440 * 3 });
      return;
    }
    const cookie = Cookies.get('timeOut');
    if (cookie !== undefined) {
      alert("You have exceeded the maximum number of failed login attempts. Please try again later.");
      return;
    }

    var user: IBackEndUser = {
      Email: email,
      Password: password,
      UiD: 0
    }

    userAPI.loginUser(user).then((res) => {
      if (res.ok) {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log(data);
            if (data.id === 0) {
              alert("Invalid email or password");
              Cookies.set("failedLoginAttempts", (failedLoginAttempts + 1).toString());
              setPassword("");
              return;
            }
            //successfull login
            Cookies.set("failedLoginAttempts", "0");
            const cookie = uuidv4();
            Cookies.set("loggedIn", cookie, { expires: 30 }); //change later
            Cookies.set("userID", data.id, { expires: 30 }); //change later
          })
        }
        else {
          alert("Invalid email or password");
          Cookies.set("failedLoginAttempts", (failedLoginAttempts + 1).toString());
          setPassword("");
        }
      }
    })


    handleClose();
  }

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
     w-24"  onClick={handleOpen}>
        {Cookies.get("loggedIn") !== undefined ? "Logout" : "Login"}</Button>
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
                Welcome back!
              </div>
              <div className="font-light text-neutral-500 mt-2">
                Login to your account
              </div>
            </div>
            <TextField sx={{ m: 1, width: '35ch' }} value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" />
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
            <CustomButton
              outline
              label="Continue with Google"
              icon={FcGoogle}
              onClick={() => { }}
            />

            <CustomButton
              outline
              label="Login"
              onClick={handleSubmit}
            />

          </Stack>

        </Box>
      </Modal>
    </div>
  );
}