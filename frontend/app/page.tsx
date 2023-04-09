'use client';

import ShiftList from "./Components/Shifts/Shiftlist"
import { IShift, date_instance } from "./Helper/Modules"
import { useState } from "react"
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import convert_date2db from "./Helper/Functions";
import { Paper, Box, Grid } from "@mui/material";
import ReturnWorkDay from "./Components/Shifts/WorkDay";


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
      JobbId: 1,
      JobName: "Job name"
    }
    setShiftList([...shiftList, newShift])
  }

  const daysOfWeek = [
    { name: "Monday", dayIndex: 1 },
    { name: "Tuesday", dayIndex: 2 },
    { name: "Wednesday", dayIndex: 3 },
    { name: "Thursday", dayIndex: 4 },
    { name: "Friday", dayIndex: 5 },
    { name: "Saturday", dayIndex: 6 },
    { name: "Sunday", dayIndex: 0 },
  ];


  return (
    <>
    <div>
    <Stack spacing={3} justifyContent="center" alignItems="center">
    <Button className="bg-rose-300
     text-black 
     font-semibold 
     px-4
     text-sm
     hidden
     hover:bg-gray-300
     flex-center 
     text-center 
     border-x-[1px] 
     sm:block" 
    onClick={addShift}>Add Shift</Button>
       <Paper>
       <Box p={10} sx={{ width: "100%", height: "100%" }}>
        <Grid container spacing={2} alignItems="stretch">
          {daysOfWeek.map(({ name, dayIndex }) => (
            <Grid key={dayIndex} item xs={20} sm>
              <Box mt={-4} textAlign="center">{name}</Box>
              <Box sx={{
                borderRadius: '25px',
                overflow: "auto",
                color: "black",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "1cm",
                height: "100%", // Added height property to allow the Box component to stretch to fill the available space
              }} alignSelf="stretch">
                <ReturnWorkDay shiftList={shiftList} day={dayIndex} date={date_instance} Refresh={() => { }} Delete={() => { }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
    </Stack>
    </div>
    </>
  )
}
