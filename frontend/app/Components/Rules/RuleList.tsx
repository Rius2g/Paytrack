'use client';


import { IJob, IRule } from "@/app/Helper/Modules"
import Rule from "./Rule";

const RuleList = (props:{ruleList:IRule[], jobList:IJob[]}) => {
    return (
        <div className="flex justify-center text-center sm:block px-8">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Rules</h1>
            </div>
            {props.ruleList.map((rule:IRule) => {
                return <Rule key={rule.JobID} rule={rule} jobList={props.jobList}/>
            })
            }
        </div>
    )
}

export default RuleList