'use client';

import dayjs, { Dayjs } from 'dayjs';
import weekOfTheYearPlugin from "dayjs/plugin/weekOfYear";
import isBetweenPlugin from 'dayjs/plugin/isBetween';


dayjs.extend(isBetweenPlugin);
dayjs.extend(weekOfTheYearPlugin);

interface IShift {
    shiftID: number;
    shiftDate: number;
    shiftStartTime: number;
    shiftEndTime: number;
    uiD: number;
    jobbID: number;
    jobName?: string;
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
    jobID: number;
    jobName: string;
    payRate: number;
    uiD: number;
}

interface IRule {
    RuleID: number;
    JobID: number;
    Rate: number;
    UiD: number;
    RateType: string;
    RuleType: string;
    Day?: string;
    Start?: number;
    Date?: number;
    jobName?: string;
  }

interface IUser {
    UiD: number;
    Email: string;
    Password: string;
    loggedIn: boolean;
}


interface IBackEndUser {
    UiD: number;
    Email: string;
    Password: string;
}



export type { IShift, IDate, IJob, IRule, IUser, IBackEndUser }