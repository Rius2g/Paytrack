'use client';


import { IJob } from "@/app/Helper/Modules"
import Jobs from "./Jobs"

const JobList = (props:{joblist:IJob[]}) => {
    return (
        <div>
            {props.joblist.map((job:IJob) => {
                return <Jobs key={job.JobID} job={job}/>
            })
            }
        </div>
    )
}

export default JobList