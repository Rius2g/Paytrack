'use client';


import { IRule } from "@/app/Helper/Modules"
import Rule from "./Rule";

const RuleList = (props:{ruleList:IRule[]}) => {
    return (
        <div>
            {props.ruleList.map((rule:IRule) => {
                return <Rule key={rule.JobID} rule={rule}/>
            })
            }
        </div>
    )
}

export default RuleList