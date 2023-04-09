import React from 'react';
import { IShift, IDate } from '@/app/Helper/Modules';
import Shift from './Shift';
import weekOfTheYearPlugin from 'dayjs/plugin/weekOfYear';
import dayjs from 'dayjs';
import { convert_dbDate2Frontend } from '@/app/Helper/Functions';
import { Stack } from '@mui/material';

dayjs.extend(weekOfTheYearPlugin);

export default function ReturnWorkDay(props:{shiftList:IShift[], day:number, date:IDate, Refresh:() => void, Delete:(id:number) => void}){
    
    return (
        <div>
            <Stack justifyContent="center" alignItems="center" spacing={6}>
            {props.shiftList.map((shift) => {
                let date = convert_dbDate2Frontend(shift.ShiftDate);
                if (date.day() === props.day && date.week() === props.date.week && date.year() === props.date.year){
                    return (
                        <div key={shift.ShiftID + shift.ShiftDate}>
                            <Shift shift={shift}/>
                        </div>
                    )
                }
                else if (date.day() === props.day && date.week() === props.date.week+1 && date.year() === props.date.year){
                    return (
                        <div key={shift.ShiftID + shift.ShiftDate}>
                        <Shift shift={shift}/>
                    </div>
                    )
                }
            }
            )}
            </Stack>
        </div>
    )
}