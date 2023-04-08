'use client';

import * as React from 'react';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Stack } from '@mui/material';
import { IShift } from '@/app/Helper/Modules';
import { numberto_DayjsTime } from '@/app/Helper/Functions';

export default function TimePickers(props:{shift:IShift}) {
  const [ startValue, setStartValue] = React.useState<Dayjs | null>(numberto_DayjsTime(props.shift.ShiftStartTime));
  const [ endValue, setEndValue] = React.useState<Dayjs | null>(numberto_DayjsTime(props.shift.ShiftEndTime));

  console.log(startValue);
  console.log(endValue);

  return (
    <Stack direction="row">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Start Time"
          value={startValue}
          onChange={(newValue) => setStartValue(newValue)}
        />
        <TimePicker
          label="End time"
          value={endValue}
          onChange={(newValue) => setEndValue(newValue)}
        />
    </LocalizationProvider>
    </Stack>
  );
}