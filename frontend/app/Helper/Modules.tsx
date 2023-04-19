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
    UiD: number;
    JobbId: number;
    JobName: string;
}

export interface IAuth {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  }

export interface UserIdType{

  userId: number;
  setuserId: React.Dispatch<React.SetStateAction<number>>;

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

interface IJob {
    JobID: number;
    JobName: string;
    PayRate: number;
    UiD: number;
}

interface IRule {
    RuleID: number;
    JobID: number;
    UiD: number;
    RuleType: string;
    Rate: number;
    Date?: number;
    StartTime?: number;
    EndTime?: number;
    Day?: number;
    RateType?: string;

}

interface IUser {
    UiD: number;
    Email: string;
    Password: string;
    loggedIn: boolean;
}


interface IBackEndUser {
    UserID: number;
    Email: string;
    Password: string;
}



export type { IShift, IDate, IJob, IRule, IUser, IBackEndUser }