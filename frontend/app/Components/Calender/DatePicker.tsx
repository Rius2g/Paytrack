'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IShift } from '@/app/Helper/Modules';
import convert_date2db, { convert_dbDate2Frontend } from '@/app/Helper/Functions';

export default function DatePick(props:{shift:IShift, handleChange: (date: Dayjs | null) => void }) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(convert_dbDate2Frontend(props.shift.shiftDate)));

  const handleDateChange = (newValue: Dayjs, shiftID: number) => {
    setValue(newValue);
    props.shift.shiftDate = convert_date2db(newValue);
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Shift Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
            props.handleChange(newValue);
          }}
        />
    </LocalizationProvider>
  );
}