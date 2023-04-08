'use client';

import dayjs, { Dayjs } from 'dayjs';
import weekOfTheYearPlugin from "dayjs/plugin/weekOfYear";
import isBetweenPlugin from 'dayjs/plugin/isBetween';


dayjs.extend(isBetweenPlugin);
dayjs.extend(weekOfTheYearPlugin);

interface IShift {
    ShiftID: number;
    ShiftDate: number;
    ShiftStartTime: number;
    ShiftEndTime: number;
    ShiftBreakTime: number;
    UiD: number;
    JobbId: number;
}

interface IDate 
{
    date: Dayjs,
    week: number,
    month: number,
    day: number,
    year: number,
    endOf: Dayjs,
    startOf: Dayjs
};


var date_instance:IDate = {
    date: dayjs(),
    week: dayjs().week(),
    month: dayjs().month(),
    day: dayjs().day(),
    year: dayjs().year(),
    endOf: dayjs().endOf('week'),
    startOf: dayjs().startOf('week')
}


export { date_instance };
export type { IShift, IDate }