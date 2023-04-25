'use client';

import WeekPopup from "../Calender/Weekpopup";
import { IDate } from "../../Helper/Modules";
import PayModal from "../Modals/PayModal";

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
                px-4
              "
            >
              <WeekPopup date={props.date} />
            </div>
            <div 
              className="
                hidden 
                sm:block 
                text-sm 
                font-semibold 
                px-4
                border-x-[1px] 
                flex-1 
                text-center
              "
            >
              <PayModal />
            </div>
          </div>
        </div>
      );
    };

export default Search