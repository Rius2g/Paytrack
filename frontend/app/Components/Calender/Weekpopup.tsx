import React, { useState } from 'react';
import { Popover } from '@mui/material';
import Weekpicker from './Weekpicker';
import Button from '@mui/material/Button';
import { IDate } from '../../Helper/Modules';

//own popup component that displays a weekpicker when clicked, weekpicker is used to change the week
export default function WeekPopup(props:{date:IDate, Refresh:() => void}){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        props.Refresh( );
    };

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
               week {props.date.week}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div>
                   <Weekpicker date={props.date} handleclose={handleClose}/>
                   </div>
            </Popover>
                                
        </div>
    );
}

