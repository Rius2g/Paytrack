import React, { useEffect, useState } from 'react';
import { IJob, IShift } from '@/app/Helper/Modules';
import { Dayjs } from 'dayjs';
import convert_date2db from '@/app/Helper/Functions';
import DatePick from '../Calender/DatePicker';
import TimePickers from '../Calender/TimePicker';
import { IconButton, Select, Stack } from '@mui/material';
import { dayjsTime_toNumber} from '@/app/Helper/Functions';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import { ShiftsAPI } from '@/app/api/ShiftsAPI';


let api = new ShiftsAPI();

const Shift = (props: { shiftList:IShift[], shift: IShift, jobList:IJob[], Refresh:() => void, Delete:(id:number) => void}) => {
  const [job, setJob] = useState("");

  const findJob = () => {
    let job = props.jobList.find(job => job.jobID === props.shift.jobbID);
    if (job) {
      setJob(job.jobName);
    }
    else {
      setJob("No job");
    }
  }

  const changeTimes = (start: Dayjs | null, end: Dayjs | null) => {
    if(start && end)
    {
    props.shift.shiftStartTime = dayjsTime_toNumber(start);
    props.shift.shiftEndTime = dayjsTime_toNumber(end);
    //api call here to change the times
    api.updateShift(props.shift);
    }
  }


  const changeDate = (date: Dayjs | null) => {
    if(date)
    {
    props.shift.shiftDate = convert_date2db(date);
    api.updateShift(props.shift);
    props.Refresh();
    }
  }

  const handleJobChange = (event: SelectChangeEvent) => {
    setJob(event.target.value); //update the state
    props.shift.jobName = event.target.value; //update the actual value in the user
    props.shift.jobbID = props.jobList.find(job => job.jobName === event.target.value)?.jobID || 0;
    api.updateShift(props.shift);
  };

  const deleteShift = () => {
    api.deleteShift(props.shift.shiftID, props.shift.uiD);
    props.Delete(props.shift.shiftID);
  }



  //set the job name
  useEffect(() => {
    findJob();
  })



  return (
    <div style={{ width: '180px' }}>
      <Stack spacing={1}>
       {/* <div className="font-bold text-black text-center flex-center">
       <Select 
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={job}
              label="Exercise Name"
              onChange={handleJobChange}
              >
              {Object.values(props.jobList).map((job: IJob) => (
              <MenuItem key={job.JobID} value={job.JobID}>{job.JobName}</MenuItem>
            ))}
              </Select>
        </div> */}
        <DatePick shift={props.shift} handleChange={changeDate} />
        <TimePickers shift={props.shift} handleChange={changeTimes} />
      </Stack>
      <IconButton onClick={deleteShift}>Delete</IconButton>

    </div>
  );
};

export default Shift;
