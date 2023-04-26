'use client';


import { IJob } from "@/app/Helper/Modules"
import Jobs from "./Jobs"

const JobList = (props:{joblist:IJob[], Delete:(job:IJob) => void}) => {
    return (
        <div>
            {props.joblist.map((job:IJob) => {
                return <Jobs key={job.jobID} job={job} Delete={props.Delete}/>
            })
            }
        </div>
    )
}

export default JobList