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
import { JobsAPI } from '@/app/api/JobsAPI';
import { useEffect } from 'react';

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

var api = new JobsAPI();
export default function JobModal() {
  const [ open, setOpen ] = useState(false);
  const [ jobs, setJobs ] = useState<IJob[]>([]);

  const [userId, setuserId] = React.useState<number>(() =>
  Cookies.get("userID") !== undefined
    ? (Cookies.get("userID") as unknown as number)
    : 0
  );


  const getUserId = () => {
    if (Cookies.get("userID") !== undefined) {
      return Cookies.get("userID") as unknown as number;
    } else {
      return 0;
    }
  };


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
      jobID: jobs.length + 1,
      jobName: "New Job",
      payRate: 0,
      uiD: 1
    }
    setJobs([...jobs, newJob]);
    const response = api.postJob(newJob);
    response.then((data) => {
      newJob.jobID = data;
    }
    )
  }

  const handleDelete = (job: IJob) => {
    var newJobs = jobs.filter((item) => item.jobID !== job.jobID);
    setJobs(newJobs);
  }
    
  useEffect(() => {
    getUserId();
    if(userId === 0 || userId === undefined || userId === null || open === false)
    {
      return;
    }

    api.getJobs(userId).then((data) => {
      setJobs(data);
    }
    )
  }, [open])


  

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
        <JobList joblist={jobs} Delete={handleDelete}/>
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