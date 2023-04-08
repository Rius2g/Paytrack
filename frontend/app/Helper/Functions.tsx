import dayjs, { Dayjs } from "dayjs";

//includes functions to convert dates to and from the database (integer format)

export default function convert_date2db(date:Dayjs){
    var d = date.date();
    var m = date.month() + 1;
    var y = date.year();
    var date_string = y * 10000 + m * 100 + d;

    return date_string;
}


export function convert_dbDate2Frontend(date:number){
    var d = date.toString().slice(6,8);
    var m = date.toString().slice(4,6);
    var y = date.toString().slice(0,4);
    var date_string = y + "-" + m + "-" + d;

    return dayjs(date_string);
}

export function convert_dbDate2FrontendString(date:number)
{
    var d = date.toString().slice(6,8);
    var m = date.toString().slice(4,6);
    var y = date.toString().slice(0,4);
    return d + "-" + m + "-" + y;

}

export function number_to_timeString(time:number){
    var hours = Math.floor(time / 100);
    var minutes = time % 100;
    var time_string = hours + ":" + minutes;
    return time_string;
}

export function dayjsTime_toNumber(time:Dayjs){
    var hours = time.hour();
    var minutes = time.minute();
    var time_number = hours * 100 + minutes;
    return time_number;
}


export function numberto_DayjsTime(time: number) {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const time_string = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return dayjs(time_string, 'HH:mm');
  }
  