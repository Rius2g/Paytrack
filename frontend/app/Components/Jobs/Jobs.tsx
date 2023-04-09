'use client';

import { IJob } from "@/app/Helper/Modules"
import { useState } from "react"
import { Stack } from "@mui/material"
import TextField from "@mui/material/TextField";





const Jobs = (props:{job:IJob}) => {
    const [ payRate, setPayRate ] = useState<number>(props.job.PayRate);
    const [ jobName, setJobName ] = useState<string>(props.job.JobName);


    const handlePayRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayRate(Number(event.target.value));
        props.job.PayRate = Number(event.target.value);
    };

    const handleJobNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobName(event.target.value);
        props.job.JobName = event.target.value;
    };


    return (
        <div>
            <Stack spacing={1} >
                <TextField id="outlined-basic" label="Job Name" variant="outlined" value={jobName} onChange={handleJobNameChange}/>
                <TextField id="outlined-basic" label="Payrate" variant="outlined" value={payRate} onChange={handlePayRateChange}/>
            </Stack>
        </div>

    )
}

export default Jobs