import { IExplenation } from "@/app/Helper/Modules"

const Explenation = (props:{Explenation:IExplenation}) => {
    return (
        <div>
            {props.Explenation.Job}
            {props.Explenation.Hours}
            {props.Explenation.Rate}
            {props.Explenation.Salary}
            {props.Explenation.Type}
            {props.Explenation.RuleType}
        </div>
    )
}

export default Explenation