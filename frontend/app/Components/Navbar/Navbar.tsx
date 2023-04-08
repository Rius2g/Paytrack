'use client';

import Container from "../Container";
import Search from "./Search";
import UserMenu from "./Usermenu";
import Logo from "./Logo";
import { IDate } from "@/app/Helper/Modules";

const Navbar = (props:{date:IDate}) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div
            className="
            py-4
            border-b-[1px]
            "
            >
            <Container >
                <div
                className="
                flex
                flex-row
                items-center
                justify-between
                gap-5
                md:gap-0
                "
                >
                <Logo />
                <Search date={props.date} />
                <UserMenu />
                </div>
            </Container>
            </div>
        </div>
    )
}

export default Navbar