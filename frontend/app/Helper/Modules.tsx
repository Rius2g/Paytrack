'use client';

import dayjs, { Dayjs } from 'dayjs';
import weekOfTheYearPlugin from "dayjs/plugin/weekOfYear";
import isBetweenPlugin from 'dayjs/plugin/isBetween';


dayjs.extend(isBetweenPlugin);
dayjs.extend(weekOfTheYearPlugin);

interface IShift {
    id: number;
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
    id: number;
    jobName: string;
    payRate: number;
    uiD: number;
}

interface IRule {
  id: number;
  jobID: number;
  rate: number;
  uiD: number;
  rateType: string;
  ruleType: string;
  day?: string;
  start?: number;
  date?: number;
  jobName?: string;
}

interface IUser {
    id: number;
    Email: string;
    Password: string;
    loggedIn: boolean;
}


interface IBackEndUser {
    UiD: number;
    Email: string;
    Password: string;
}

interface IExplenation {
  Job: string;
  Shifts: number;
  Hours: number;
  Rate: number;
  Salary: number;
  Type: string;
  RuleType?: string;
}



export type { IShift, IDate, IJob, IRule, IUser, IBackEndUser, IExplenation }