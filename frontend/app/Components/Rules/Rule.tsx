'use client';

import { IJob, IRule } from '@/app/Helper/Modules';
import { Stack, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';



const Rule = (props:{rule:IRule, jobList:IJob[]}) => {
    const [ jobName, setJobName ] = useState("");
    const [ jobList, setJobList ] = useState<IJob[]>(props.jobList);
    const [ ruleType, setRuleType ] = useState(0);
    const [ compansationType, setCompansationType ] = useState(0);
    const [ compansationValue, setCompansationValue ] = useState(0);
    const [ ruleValue, setRuleValue ] = useState(0);



    const handleChange = (event: SelectChangeEvent) => {
        //set jobrate as well
        const selectedJobName = event.target.value as string;
        setJobName(selectedJobName);
       // props.rule.JobID = Number(event.target.value);
        };

    const handleRuleTypeChange = (event: SelectChangeEvent) => {
        const selectedRuleType = event.target.value as string;
        setRuleType(options[selectedRuleType]);
    }

    const handleCompansationTypeChange = (event: SelectChangeEvent) => {
        const selectedCompansationType = event.target.value as string;
        setCompansationType(compansationOptions[selectedCompansationType]);
    }

    const handleCompansationValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCompansationValue = event.target.value as string;
        setCompansationValue(Number(selectedCompansationValue));
    }

        

    const options: { [key: string ]: number} = {
        "Time": 0,
        "Day": 1,
        "Time and Day": 2,
        "Date": 3
    }

    const compansationOptions: { [key: string ]: number} = {
        "%": 0,
        "Flat": 1
    }

    return (
        <div>
            <Stack spacing={2} direction="row">
            <Stack spacing={2} >
                <InputLabel id="demo-simple-select-label">Job</InputLabel>
                <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={jobName}
                label="Job"
                onChange={handleChange}
                >
                {jobList.map((job) => (
                    <MenuItem key={job.jobName} value={job.jobName}>
                    {job.jobName}
                </MenuItem>
                ))}
                </Select>
              </Stack>
              <Stack spacing={2}>
                <InputLabel id="demo-simple-select-label">Rule type</InputLabel>
                <Select
                label="Rule type"
                onChange={handleRuleTypeChange}>
                        {Object.keys(options).map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                </Select>
              </Stack>
            <Stack spacing={2}>
                <InputLabel id="demo-simple-select-label">Compansation type</InputLabel>
                <Select
                label="Compansation type"
                onChange={handleCompansationTypeChange}>
                        {Object.keys(compansationOptions).map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                </Select>
            </Stack>
            <Stack spacing={2}>
                <InputLabel id="demo-simple-select-label">Rule value</InputLabel>
                <TextField className="w-28" id="outlined-basic" variant="outlined" value={compansationValue} onChange={handleCompansationValue} />
            </Stack>
            </Stack>
        </div>

    )

}

export default Rule