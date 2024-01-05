'use client';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useEffect, useState, useContext } from 'react';
import { Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import convert_date2db from '@/app/Helper/Functions';
import { convert_dbDate2FrontendString } from '@/app/Helper/Functions';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PayAPI } from '@/app/api/PayAPI';
import { UserContext } from '@/app/page';
import { IExplenation } from '@/app/Helper/Modules';
import ExplenationsList from './ExplenationList';


var api = new PayAPI();
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function PayModal() {
    const [open, setOpen] = useState(false);
    const User_context = useContext(UserContext);
    const [ startDate, setStartDate ] = useState<Dayjs | null>(dayjs().add(-5, 'day'));
    const [ endDate, setEndDate ] = useState<Dayjs | null>(dayjs().add(7, 'day'));
    const [ expectedPay, setExpectedPay ] = useState(0);
    const [explenations, setExplenations] = useState<IExplenation[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStartChange = (newValue: Dayjs | null) => {
        if(newValue)
        {
        setStartDate(newValue);
        }
        //api call
    };

    const handleEndChange = (newValue: Dayjs | null) => {
        if(newValue)
        {
        setEndDate(newValue);
        }
        //api call
    };

    const start = convert_date2db(startDate ?? dayjs());
    const end = convert_date2db(endDate ?? dayjs());

  useEffect(() => {
    //api call
    var uid = User_context.id;
    if(uid != 0)
    {
    api.getPay(uid, start, end).then((resp) => {
        setExpectedPay(resp.expected_pay);
        setExplenations(resp.explanations);
    });
  }
    
  }, [start, end, open, User_context.id]);


  

    var startFront = convert_dbDate2FrontendString(start);
    var endFront = convert_dbDate2FrontendString(end);

  return (
    <div>
       {/* style this button */}
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
     sm:block" variant="contained" onClick={handleOpen}>Expected pay</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
            <Stack spacing={3} justifyContent="center" alignItems="center">
        <div
        className="
        font-bold
        text-lg
        flex-center
        sm:block
        flex-row
        text-center
        ">
        Expected pay
        </div>
        <Stack direction="row" justifyContent="center" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Start range"
                value={startDate}
                onChange={handleStartChange}
                />
                <DatePicker
                    label="End range"
                    value={endDate}
                    onChange={handleEndChange}
                    />
            </LocalizationProvider>
        </Stack>
          <Stack spacing={8} justifyContent="center" alignItems="center">
            <div
            className="
            font-bold
            text-lg
            flex-center
            text-center
            sm:block
            "
            >
                    <Stack justifyContent="center" alignItems="center">
                    <div>
                    Expected pay for range
                    </div>
                        <Stack spacing={2} justifyContent="center" alignItems="center">
                            <div>
                                {startFront} - {endFront}:
                            </div>
                            <Stack spacing={3}>
                              <div className="font-bold text-xl">
                                {expectedPay}
                              </div>
                              <ExplenationsList Explenation={explenations}/>
                            </Stack>
                        </Stack>
                        </Stack>
                    </div>
                </Stack>
            </Stack>
        </Box>
      </Modal>
    </div>
  );
}