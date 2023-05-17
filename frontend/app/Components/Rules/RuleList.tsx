'use client';


import { IJob, IRule } from "@/app/Helper/Modules"
import Rule from "./Rule";

const RuleList = (props:{ruleList:IRule[], jobList:IJob[]}) => {
    return (
        <div>
            {props.ruleList.map((rule:IRule) => {
                return <Rule key={rule.JobID} rule={rule} jobList={props.jobList}/>
            })
            }
        </div>
    )
}

export default RuleList