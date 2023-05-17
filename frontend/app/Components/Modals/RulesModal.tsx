'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CustomButton from '../Button';
import { IJob, IRule } from '@/app/Helper/Modules';
import { Stack } from '@mui/material';
import RuleList from '../Rules/RuleList';
import Cookies from "js-cookie";
import { JobsAPI } from '@/app/api/JobsAPI';


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

var jobsAPI = new JobsAPI();
export default function RulesModal() {
  const [ open, setOpen ] = useState(false);
  const [ rules, setRules ] = useState<IRule[]>([]);
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

  const handleNewRule = () => {
    //api call here
    if(userId === 0 || userId === undefined)
    {
      alert("You must be logged in to add a rule");
      return;
    }
    
    var newRule: IRule = {
        RuleID: rules.length + 1,
        JobID: 0,
        RuleType: "",
        UiD: 0,
        Rate: 0,
    }
    setRules([...rules, newRule])
  }

  React.useEffect(() => {
    //api call to fetch rules
    jobsAPI.getJobs(userId).then((res) => {
      setJobs(res.data);
    }
    );

  }, []);
  

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
     w-24"  onClick={handleOpen}>Rules</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Stack spacing={1} >
            <RuleList ruleList={rules} jobList={jobs}/>
         <CustomButton
            onClick={handleNewRule}
            label="Add new Rule"
            outline
            />
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}