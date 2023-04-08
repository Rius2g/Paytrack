'use client';

import React, {useState } from 'react';
import { IShift } from '@/app/Helper/Modules';
import Shift from '@/app/Components/Shifts/Shift';
import { Stack } from '@mui/material';


const ShiftList = (props:{shiftList:IShift[]})   => {

    return (
        <div>
            <Stack spacing={2} >
        {props.shiftList.map((shift:IShift) => {
            return <Shift key={shift.ShiftID} shift={shift}/>
        })
        }
        </Stack>
        </div>
    )
}

export default ShiftList