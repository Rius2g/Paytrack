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

  const mapRuleToJobName = () => {
    rules.map((rule) => {
      const job = jobs.find((job) => job.jobID === rule.JobID);
      if(job) {
        rule.jobName = job.jobName;
      }
    })
  }


  const handleNewRule = () => {
    //api call here
    console.log("new rule");
    if(userId === 0 || userId === undefined)
    {
      alert("You must be logged in to add a rule");
      return;
    }
    
    var newRule: IRule = {
        RuleID: rules.length + 1,
        JobID: 1,
        RuleType: 1,
        UiD: Number(userId),
        Rate: 10,
        Date: 0,
        Start: 0,
        Day: 0,
        RateType: 1,
        jobName: "Job Name"
    }
    setRules([...rules, newRule])
    rulesAPI.postRule(newRule);
  }

  React.useEffect(() => {
    if(userId === 0 || userId === undefined || userId === null || open === false)
    {
      return;
    }
    //api call to get rules and the jobs for the list
    rulesAPI.getRules(userId).then((res) => {
      console.log(res);
      setRules(res);
    }
    );
    jobsAPI.getJobs(userId).then((res) => {
      setJobs(res);
    }
    );
    mapRuleToJobName();

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