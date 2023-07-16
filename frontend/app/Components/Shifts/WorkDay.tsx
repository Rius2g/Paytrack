import React from 'react';
import { IShift, IDate, IJob } from '@/app/Helper/Modules';
import Shift from './Shift';
import weekOfTheYearPlugin from 'dayjs/plugin/weekOfYear';
import dayjs from 'dayjs';
import { convert_dbDate2Frontend } from '@/app/Helper/Functions';
import { Stack } from '@mui/material';
import JobList from '../Jobs/JobsList';

dayjs.extend(weekOfTheYearPlugin);

export default function ReturnWorkDay(props:{shiftList:IShift[], jobList:IJob[], day:number, date:IDate, Refresh:() => void, Delete:(id:number) => void}){
    
    return (
        <div>
            <Stack justifyContent="center" alignItems="center">
            {props.shiftList.map((shift) => {
                let date = convert_dbDate2Frontend(shift.shiftDate);
                if (date.day() === props.day && date.week() === props.date.week && date.year() === props.date.year){
                    return (
                        <div key={shift.shiftID + shift.shiftDate}>
                            <Shift shiftList={props.shiftList} shift={shift} jobList={props.jobList} Refresh={props.Refresh} Delete={props.Delete}/>
                        </div>
                    )
                }
                else if (date.day() === props.day && date.week() === props.date.week+1 && date.year() === props.date.year){
                    return (
                        <div key={shift.shiftID + shift.shiftDate}>
                        <Shift shiftList={props.shiftList} shift={shift} jobList={props.jobList} Refresh={props.Refresh} Delete={props.Delete}/>
                    </div>
                    )
                }
            }
            )}
            </Stack>
        </div>
    )
}