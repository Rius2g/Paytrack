import { IExplenation } from "@/app/Helper/Modules"
import Explenation from "./Explenation"
import { Stack } from "@mui/material"

const ExplenationsList = (props:{Explenation:IExplenation[]}) => {
    return (
        <div>
            <Stack spacing={1} >
                {props.Explenation.map((explenation:IExplenation, id) => (
                    <Explenation Explenation={explenation} key={id}/>
                ))}
            </Stack>
        </div>
    )
}

export default ExplenationsList