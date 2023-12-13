import React, { useState } from 'react';
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
  const [jobName, setJobName] = useState(props.shift.jobName);

  const handleChange = (event: SelectChangeEvent) => {

    props.shift.jobName = event.target.value as string;
    const selectedJobName = event.target.value as string;
    setJobName(selectedJobName);
    const newShift = { ...props.shift, jobName: selectedJobName };
    console.log(props.jobList);
    const selectedJob = props.jobList.find((job) => job.jobName === selectedJobName);
    console
    if (selectedJob) {
      newShift.jobbID = selectedJob.id;
    }
    console.log(newShift);

    api.updateShift(newShift);
    };

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

  const deleteShift = () => {
    api.deleteShift(props.shift.id, props.shift.uiD);
    props.Delete(props.shift.id);
  }


  return (
    <div style={{ width: '200px' }}>
      <Stack spacing={1} direction="column">
      <Select
                value={jobName}
                label="Job"
                onChange={handleChange}
                >
                {props.jobList.map((job) => (
                    <MenuItem key={job.jobName} value={job.jobName}>
                    {job.jobName}
                </MenuItem>
                ))}
                </Select>
        <DatePick shift={props.shift} handleChange={changeDate} />
        <TimePickers shift={props.shift} handleChange={changeTimes} />
      </Stack>
      <IconButton onClick={deleteShift}>Delete</IconButton>

    </div>
  );
};

export default Shift;
