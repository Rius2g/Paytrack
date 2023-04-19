'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CustomButton from '../Button';
import JobList from '../Jobs/JobsList';
import { IJob } from '@/app/Helper/Modules';
import { Stack } from '@mui/material';
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

export default function JobModal() {
  const [ open, setOpen ] = useState(false);
  const [ jobs, setJobs ] = useState<IJob[]>([]);

  const [userId, setuserId] = React.useState<number>(() =>
  Cookies.get("userID") !== undefined
    ? (Cookies.get("userID") as unknown as number)
    : 0
  );

  const handleOpen = () => {
    //api call to fetch jobs
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewJob = () => {
    //api call here
    if(userId === 0)
    {
      alert("You must be logged in to add a job");
      return;
    }
    var newJob: IJob = {
      JobID: jobs.length + 1,
      JobName: "New Job",
      PayRate: 0,
      UiD: 1
    }
    setJobs([...jobs, newJob]);
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
     w-24"  onClick={handleOpen}>Jobs</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Stack spacing={1} >
        <JobList joblist={jobs} />
         <CustomButton
            onClick={handleNewJob}
            label="Add new job"
            outline
            />
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}