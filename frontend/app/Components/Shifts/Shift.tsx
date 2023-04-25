import React, { useEffect, useState } from 'react';
import { IJob, IShift } from '@/app/Helper/Modules';
import dayjs, { Dayjs } from 'dayjs';
import convert_date2db, { number_to_timeString } from '@/app/Helper/Functions';
import DatePick from '../Calender/DatePicker';
import TimePickers from '../Calender/TimePicker';
import { Select, Stack } from '@mui/material';
import { convert_dbDate2Frontend, dayjsTime_toNumber} from '@/app/Helper/Functions';
import { MenuItem, SelectChangeEvent } from '@mui/material';


const Shift = (props: { shift: IShift, jobList:IJob[] }) => {
  const [job, setJob] = useState("");

  const findJob = () => {
    let job = props.jobList.find(job => job.JobID === props.shift.jobbID);
    if (job) {
      return job.JobName;
    }
    else {
      return "No job";
    }
  }

  const changeTimes = (start: Dayjs | null, end: Dayjs | null) => {
    if(start && end)
    {
    props.shift.shiftStartTime = dayjsTime_toNumber(start);
    props.shift.shiftEndTime = dayjsTime_toNumber(end);
    //api call here to change the times
    }
  }


  const changeDate = (date: Dayjs | null) => {
    if(date)
    {
    props.shift.shiftDate = convert_date2db(date);
    }
    //api call here to change the date
  }

  const handleJobChange = (event: SelectChangeEvent) => {
    setJob(event.target.value); //update the state
    props.shift.jobName = event.target.value; //update the actual value in the user
  };


  //set the job name
  useEffect(() => {
    setJob(findJob());
  }, [])



  return (
    <div style={{ width: '180px' }}>
      <Stack spacing={1}>
       <div className="font-bold text-black text-center flex-center">
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
        </div>
        <DatePick shift={props.shift} handleChange={changeDate} />
        <TimePickers shift={props.shift} handleChange={changeTimes} />
      </Stack>
    </div>
  );
};

export default Shift;
