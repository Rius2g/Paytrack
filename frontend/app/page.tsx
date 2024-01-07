'use client';

import Home from "./Pages/Home"
import React, { useEffect } from "react";
import { createContext } from 'react';
import { IDate, IUser} from './Helper/Modules';
import dayjs from "dayjs";
import Cookies from "js-cookie";


var date_instance: IDate = {
  date: dayjs(),
  week: dayjs().week(),
  month: dayjs().month(),
  day: dayjs().day(),
  year: dayjs().year(),
  endOf: dayjs().endOf('week'),
  startOf: dayjs().startOf('week')
}

var user_instance: IUser = {
  id: 0,
  Email: "",
  Password: "",
  loggedIn: false
}

function getUiD(){
  const uid = Cookies.get("userID");
  if (uid === undefined) {
    user_instance.id = 0;
    user_instance.loggedIn = false;
    return;
  }
  user_instance.id = parseInt(uid);
  user_instance.loggedIn = true;
}

//create a function to fetch cookies and "log in the user"

export const DateContext = createContext<IDate>(date_instance);
export const UserContext = createContext<IUser>(user_instance);

export default function Pages() {
 
  useEffect(() => {
    getUiD();
  }
  , []);
  

  return (
      <div>
        <Home />
      </div>
  )
}
