'use client';

import Container from "../Container";
import Search from "./Search";
import UserMenu from "./Usermenu";
import Logo from "./Logo";
import { DateContext } from "@/app/page";
import { useContext } from "react";
import Cookies from "js-cookie";



const Navbar = () => {
    const date = useContext(DateContext);
    const loggedinEmail = Cookies.get("userName");
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
                {loggedinEmail}
                <Search date={date} />
                <UserMenu />
                </div>
            </Container>
            </div>
        </div>
    )
}

export default Navbar