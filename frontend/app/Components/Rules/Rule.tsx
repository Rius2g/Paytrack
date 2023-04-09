'use client';

import { IRule } from '@/app/Helper/Modules';
import { Stack, TextField } from '@mui/material';


const Rule = (props:{rule:IRule}) => {
    return (
        <div>
            <Stack spacing={2} direction="row">
            <div>
                {props.rule.JobID}
            </div>
            <div>
                {props.rule.Rate}
            </div>
            
            </Stack>
        </div>

    )

}

export default Rule