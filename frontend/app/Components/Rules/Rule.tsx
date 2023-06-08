'use client';

import { IJob, IRule } from '@/app/Helper/Modules';
import { Stack, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { TimePicker} from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import { dayjsTime_toNumber, numberto_DayjsTime } from '@/app/Helper/Functions';
import { RulesAPI } from '@/app/api/RulesAPI';
import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


var ruleAPI = new RulesAPI();

const options: { [key: string ]: number} = {
    "Time": 0,
    "Day": 1,
    "Time and Day": 2,
    "Date": 3
}

const compansationOptions: { [key: string ]: number} = {
    "%": 0,
    "Flat": 1
}

const days: { [key: string ]: number} = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
    "Sunday": 6
}


const Rule = (props:{rule:IRule, jobList:IJob[]}) => {
    const [ jobName, setJobName ] = useState(props.rule.jobName);
    const [ ruleType, setRuleType ] = useState(props.rule.RuleType);
    const [ compansationType, setCompansationType ] = useState(props.rule.RateType);
    const [ compansationValue, setCompansationValue ] = useState(props.rule.Rate);
    const [ ruleDay, setRuleDay ] = useState(props.rule.Day);
    const [ ruleTypeString, setRuleTypeString ] = useState(Object.keys(options)[props.rule.RuleType]);
    const [ ruleDate, setRuleDate ] = useState<Dayjs | null>(props.rule.Date !== undefined ? numberto_DayjsTime(props.rule.Date) : null);
    const [ruleStartTime, setRuleStartTime] = useState<Dayjs | null>(
        props.rule && props.rule.StartTime !== undefined
          ? numberto_DayjsTime(props.rule.StartTime)
          : null
      );

    const handleChange = (event: SelectChangeEvent) => {
        //set jobrate as well
        const selectedJobName = event.target.value as string;
        setJobName(selectedJobName);
       // props.rule.JobID = Number(event.target.value);
        };

    const handleRuleTypeChange = (event: SelectChangeEvent) => {
        const selectedRuleType = event.target.value as string;
        setRuleType(options[selectedRuleType]);
        setRuleTypeString(selectedRuleType);
    }

    const handleCompansationTypeChange = (event: SelectChangeEvent) => {
        const selectedCompansationType = event.target.value as string;
        setCompansationType(compansationOptions[selectedCompansationType]);
    }

    const handleCompansationValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCompansationValue = event.target.value as string;
        setCompansationValue(Number(selectedCompansationValue));
    }     

    const handleDayChange = (event: SelectChangeEvent) => {
        const selectedDay = event.target.value as string;
        setRuleDay(days[selectedDay]);
    }

    const saveChanges = () => {
        // lots of checks for different types and all
        //set the rule on the client and then send it to the server
        props.rule.RuleType = ruleType;
        props.rule.RateType = compansationType;
        props.rule.Rate = compansationValue;
        props.rule.Day = ruleDay;
        props.rule.Date = ruleDate !== null ? dayjsTime_toNumber(ruleDate): undefined;
        props.rule.StartTime = ruleStartTime !== null ? dayjsTime_toNumber(ruleStartTime): undefined;
        ruleAPI.updateRule(props.rule);
    }

    return (
        <div className="
        flex-center
        text-center
        sm:block
        px-4">
            <Stack spacing={2} direction="row">
            <Stack spacing={2} >
                <InputLabel id="demo-simple-select-label">Job</InputLabel>
                <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
              </Stack>
              <Stack spacing={2}>
                <InputLabel id="demo-simple-select-label">Rule type</InputLabel>
                <Select
                value={ruleTypeString}
                onChange={handleRuleTypeChange}>
                        {Object.keys(options).map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                </Select>
              </Stack>
              {ruleType === 0 ? (
                <Stack spacing={2} maxWidth={100}>
                    <InputLabel id="demo-simple-select-label">Extra after</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                        value={ruleStartTime}
                        onChange={(newValue) => {
                            setRuleStartTime(newValue);
                        }}
                        />
                    </LocalizationProvider>
                </Stack>
                ) : ruleType === 1 ? (
                    <Stack spacing={2}>
                    <InputLabel id="demo-simple-select-label">Day</InputLabel> 
                    <Select 
                    onChange={handleDayChange}>
                        {Object.keys(days).map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                        </Select>
                    </Stack>
                ) : ruleType === 2 ? (
                <Stack direction="row"> 
                <Stack spacing={2}>
                    <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select 
                    onChange={handleDayChange}>
                        {Object.keys(days).map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                        </Select>
                    </Stack>
                    <Stack spacing={2} maxWidth={100}>
                    <InputLabel id="demo-simple-select-label">Extra after</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                        value={ruleStartTime}
                        onChange={(newValue) => {
                            setRuleStartTime(newValue);
                        }}
                        />
                    </LocalizationProvider>
                    </Stack>
                </Stack>
                ) : ruleType === 3 ? (
                    <Stack spacing={2} maxWidth={100}>
                        <InputLabel id="demo-simple-select-label">Date</InputLabel> 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            label="Date"
                            value={ruleDate}
                            onChange={(newValue) => {
                                setRuleDate(newValue);
                            }}
                            />
                        </LocalizationProvider>
                    </Stack>
                ) : null}

            
            <Stack spacing={2}>
                <InputLabel id="demo-simple-select-label">Compansation type</InputLabel>
                <Select
                label="Compansation type"
                onChange={handleCompansationTypeChange}>
                        {Object.keys(compansationOptions).map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                </Select>
            </Stack>
            <Stack spacing={2}>
                <InputLabel id="demo-simple-select-label">Rule value</InputLabel>
                <TextField className="w-28" id="outlined-basic" variant="outlined" value={compansationValue} onChange={handleCompansationValue} />
            </Stack>
            <Button variant="contained" color="primary" onClick={saveChanges}>
                Save
            </Button>
            </Stack>
        </div>

    )

}

export default Rule