'use client';

import { IJob } from "@/app/Helper/Modules"
import { useState } from "react"
import { Stack } from "@mui/material"
import TextField from "@mui/material/TextField";
import { JobsAPI } from "@/app/api/JobsAPI";
import { Button } from "@mui/material";

var api = new JobsAPI();
const Jobs = (props:{job:IJob, Delete:(job:IJob) => void}) => {
    const [ payRate, setPayRate ] = useState<number>(props.job.payRate);
    const [ jobName, setJobName ] = useState<string>(props.job.jobName);


    const handlePayRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayRate(Number(event.target.value));
        props.job.payRate = Number(event.target.value);
    };

    const handleJobNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobName(event.target.value);
        props.job.jobName = event.target.value;
    };

    const handleDelete = () => {
        api.deleteJob(props.job);
        props.Delete(props.job);
    }



    return (
        <div>
            <Stack spacing={1} >
                <TextField id="outlined-basic" label="Job Name" variant="outlined" value={jobName} onChange={handleJobNameChange}/>
                <TextField id="outlined-basic" label="Payrate" variant="outlined" value={payRate} onChange={handlePayRateChange}/>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="contained" color="primary" onClick={() => api.updateJob(props.job)}>Update</Button>
                    <Button variant="contained" color="primary" onClick={handleDelete}>Delete</Button>
                </Stack>
            </Stack>
        </div>

    )
}

export default Jobs