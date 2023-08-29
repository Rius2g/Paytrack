'use client';

import Home from "./Pages/Home"
import React from "react";
import Cookies from "js-cookie";
import { createContext } from 'react';
import { IDate, UserIdType } from './Helper/Modules';
import dayjs from "dayjs";


export const UserId = createContext<UserIdType>({
  userId: 0,
  setuserId: () => { },
});

var date_instance:IDate = {
  date: dayjs(),
  week: dayjs().week(),
  month: dayjs().month(),
  day: dayjs().day(),
  year: dayjs().year(),
  endOf: dayjs().endOf('week'),
  startOf: dayjs().startOf('week')
}

export const DateContext = createContext<IDate>(date_instance);



export default function Pages() {

  const [userId, setuserId] = React.useState<number>(() =>
  Cookies.get("userID") !== undefined
    ? (Cookies.get("userID") as unknown as number)
    : 0
  );
  
  //Sets the userId for the user that was logged in.
  const Userfound = React.useCallback(
  (data: number) => {
    setuserId(data);
  },
  []
  );


  return (
    <>
      <div>
        <Home/>
      </div>
    </>
  )
}
