'use client';

import { IShift, IJob } from "../Helper/Modules"
import { useEffect, useState, useContext } from "react"
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import convert_date2db, { convert_dbDate2Frontend } from "../Helper/Functions";
import { Box, Grid } from "@mui/material";
import ReturnWorkDay from "../Components/Shifts/WorkDay";
import { ShiftsAPI } from "../api/ShiftsAPI";
import { DateContext } from "../page";
import { JobsAPI } from "../api/JobsAPI";


const shiftsAPI = new ShiftsAPI();
const jobsAPI = new JobsAPI();
let gotJobs = false;
export default function Home(props:{uid:number}) {
  const date_instance = useContext(DateContext);
  const [ shiftList, setShiftList ] = useState<IShift[]>([])
  const [ jobList, setJobList ] = useState<IJob[]>([])

  const addShift = () => {
    if(props.uid === 0)
    {
      alert("Please login to add a shift");
      return;
    }

    const newShift: IShift = {
      shiftID: shiftList.length + 1,
      shiftDate: convert_date2db(date_instance.date),
      shiftStartTime: 1030,
      shiftEndTime: 1030,
      uiD: props.uid,
      jobbID: 1
    }
    setShiftList([...shiftList, newShift])
    const response = shiftsAPI.createShift(newShift);
    response.then((data) => {
      newShift.shiftID = data;
    }
    )

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

  const getShifts = () => {
    if(props.uid !== 0)
    {
      shiftsAPI.getShiftsInRange(convert_date2db(date_instance.startOf)+1, convert_date2db(date_instance.endOf)+1, props.uid).then((data) => {
        setShiftList(data)
      })
  
    }
    //call api to get shifts with date
  }

  const RefreshList = () => {
    //map over the existing list and exclude the shifts no longer in scope
    //set the list to the new list
   const this_weeksShifts:IShift[] = [];
   shiftList.map((shift) => {
    var date = convert_dbDate2Frontend(shift.shiftDate);
    if(date.week() === date_instance.date.week() && date.year() === date_instance.date.year())
    {
      this_weeksShifts.push(shift);
    }
    else if(date.week() === date_instance.week+1 && date.year() === date_instance.year && date.day() === 0)
    {
      this_weeksShifts.push(shift);
    }
    });
  setShiftList(this_weeksShifts);
  }

  const handleDelete = (id:number) => {
    //delete shift from list
    
    const newShiftList = shiftList.filter((shift) => shift.shiftID !== id);
    setShiftList(newShiftList);
    //delete shift from db
  }


  let getJobs = () => {
    if(props.uid !== 0)
    {
      //api call here
      jobsAPI.getJobs(props.uid).then((data) => {
        setJobList(data);
      });
    }
}


  useEffect(() => {
    getShifts();
    if(gotJobs === false)
    {
      getJobs();
      gotJobs = true;
    }

  }, [date_instance.date])


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
                <ReturnWorkDay shiftList={shiftList} jobList={jobList} day={dayIndex} date={date_instance} Refresh={RefreshList} Delete={handleDelete} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
    </div>
    </>
  )
}
