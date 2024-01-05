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
import { RulesAPI } from '@/app/api/RulesAPI';
import dayjs from 'dayjs';
import convert_date2db from '@/app/Helper/Functions';
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

var jobsAPI = new JobsAPI();
var rulesAPI = new RulesAPI();
export default function RulesModal() {
  const User_context = React.useContext(UserContext);
  const [ open, setOpen ] = useState(false);
  const [ rules, setRules ] = useState<IRule[]>([]);
  const [ jobs, setJobs ] = useState<IJob[]>([]);


  const handleOpen = () => {
    //api call to fetch jobs
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewRule = () => {
    //api call here
    const userId = User_context.id;
    if(userId === 0 || userId === undefined)
    {
      alert("You must be logged in to add a rule");
      return;
    }
    
    var newRule: IRule = {
        id: rules.length + 1,
        jobID: 1,
        ruleType: "Time",
        uiD: Number(userId),
        rate: 10,
        date: convert_date2db(dayjs()),
        start: 0,
        day: "Monday",
        rateType: "%",
        jobName: ""
    }
    setRules([...rules, newRule])
    rulesAPI.postRule(newRule);
  }

  React.useEffect(() => {
    var uid = User_context.id;
    if(uid === 0 || uid === undefined || uid === null || open === false)
    {
      return;
    }
    //api call to get rules and the jobs for the list
    rulesAPI.getRules(uid).then((res) => {
      setRules(res);
      jobsAPI.getJobs(uid).then((res) => {
        setJobs(res);
      }
      );

    }
    );

  }, [open, User_context.id]);
  

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
        <Box sx={{ ...style, width: 900 }}>
          <Stack spacing={1} style={{justifyContent: "center"}}>
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