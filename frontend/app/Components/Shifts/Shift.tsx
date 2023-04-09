import React, { useState } from 'react';
import { IShift } from '@/app/Helper/Modules';
import dayjs, { Dayjs } from 'dayjs';
import { number_to_timeString } from '@/app/Helper/Functions';
import DatePick from '../Calender/DatePicker';
import TimePickers from '../Calender/TimePicker';
import { Stack } from '@mui/material';


const Shift = (props: { shift: IShift }) => {
    const [jobb, setJobb] = useState<string>(props.shift.JobName);
    const [startTime, setStartTime] = useState<Dayjs>(dayjs(number_to_timeString(props.shift.ShiftStartTime)));
    const [endTime, setEndTime] = useState<Dayjs>(dayjs(number_to_timeString(props.shift.ShiftEndTime)));


  return (
    <div style={{ width: '180px' }}>
      <Stack spacing={1}>
       <div className="font-bold text-black text-center flex-center">
        {jobb}
        </div>
        <DatePick shift={props.shift} />
        <TimePickers shift={props.shift}/>
      </Stack>
    </div>
  );
};

export default Shift;
