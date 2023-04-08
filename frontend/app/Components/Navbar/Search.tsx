'use client';

import WeekPopup from "../Calender/Weekpopup";
import { IDate } from "../../Helper/Modules";

const Search = (props:{date:IDate}) => {
    return (
        <div 
        className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        "
        >
            <div
            className="
            flex
            flex-row
            items-center
            justify-between
            "
            >
                <div
                className="
                text-sm
                font-semibold
                px-6
                "
                >
                    <WeekPopup date={props.date} Refresh={() => {}}/>
                </div>

            </div>
        </div>
    )
}

export default Search