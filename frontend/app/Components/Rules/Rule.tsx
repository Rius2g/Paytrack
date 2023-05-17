'use client';

import { IJob, IRule } from '@/app/Helper/Modules';
import { Stack, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';



const Rule = (props:{rule:IRule, jobList:IJob[]}) => {
    const [ jobName, setJobName ] = useState("");


    const handleChange = (event: SelectChangeEvent) => {
        //set jobrate as well
        const selectedJobName = event.target.value as string;
        setJobName(selectedJobName);
       // props.rule.JobID = Number(event.target.value);
        };

    return (
        <div>
            <Stack spacing={2} direction="row">
            <Select 
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jobName}
              label="Exercise Name"
              onChange={handleChange}
              >
              {props.jobList.map((job) => (
                 <MenuItem key={job.jobName} value={job.jobName}>
                 {job.jobName}
               </MenuItem>
              ))}
              </Select>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" /> 
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </Stack>
        </div>

    )

}

export default Rule