'use client';

import Home from "./Pages/Home"
import React from "react";
import { createContext } from 'react';
import { IDate} from './Helper/Modules';
import dayjs from "dayjs";
import '../styles/globals.css'


var date_instance: IDate = {
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
  

  return (
      <div className="dark">
        <Home />
      </div>
  )
}
