'use client';

import React, {useState } from 'react';
import { IShift } from '@/app/Helper/Modules';
import Shift from '@/app/Components/Shifts/Shift';

const ShiftList = (props:{shiftList:IShift[]})   => {

    return (
        <div>
        {props.shiftList.map((shift:IShift) => {
            return <Shift key={shift.ShiftID} shift={shift}/>
        })
        }
        </div>
    )
}

export default ShiftList