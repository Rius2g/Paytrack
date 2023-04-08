'use client';

import React, {useState } from 'react';
import { IShift } from '@/app/Helper/Modules';

const Shift = (props:{shift:IShift} ) => {
 return (
    <div>
        {props.shift.ShiftID}
    </div>
 )   
}

export default Shift