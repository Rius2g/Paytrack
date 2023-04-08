'use client';

import ShiftList from "./Components/Shifts/Shiftlist"
import { IShift, date_instance } from "./Helper/Modules"
import { useState } from "react"
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import convert_date2db from "./Helper/Functions";

export default function Home() {
  const [shiftList, setShiftList] = useState<IShift[]>([])

  const addShift = () => {
    const newShift: IShift = {
      ShiftID: shiftList.length + 1,
      ShiftDate: convert_date2db(date_instance.date),
      ShiftStartTime: 1030,
      ShiftEndTime: 1030,
      ShiftBreakTime: 1,
      UiD: 1,
      JobbId: 1
    }
    setShiftList([...shiftList, newShift])
  }


  return (
    <>
    <div>
    <Stack spacing={3} justifyContent="center" alignItems="center">
    <Button className="bg-rose-300
     text-black 
     font-semibold 
     px-10 
     text-sm
     hidden
     hover:bg-gray-300
     flex-center 
     text-center 
     border-x-[1px] 
     sm:block" 
    onClick={addShift}>Add Shift</Button>
    <h1>
      <ShiftList shiftList={shiftList}/>
    </h1>
    </Stack>
    </div>
    </>
  )
}
