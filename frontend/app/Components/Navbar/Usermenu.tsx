'use client';

import React from 'react';
import { Avatar } from '@mui/material';
import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from 'react';
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import JobModal from '../Modals/JobModal';
import RulesModal from '../Modals/RulesModal';
import SettingsModal from '../Modals/SettingsModal';
import Cookies from "js-cookie";

const getLoggedInCookie = () => {
  if (Cookies.get("userID") !== undefined) {
    return true;
  } else {
    return false;
  }
}

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const loggedIn = getLoggedInCookie();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const components = [
      <LoginModal key="login" />,
      loggedIn && <RegisterModal />,
      loggedIn && <JobModal />,
      loggedIn && <RulesModal />,
      loggedIn && <SettingsModal />
    ];

    return (
        <div className="relative">
            <div className="dark flex flex-row items-center gap-5">
                <div>
                </div>
                <div
                onClick={toggleOpen}
                className="dark
                py-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
                "
                >
                <AiOutlineMenu />
                <div
                className="hidden md:block ">
                    <Avatar />
                </div>
                </div>
            </div>
            {isOpen && (
              <div className="dark absolute rounded-xl shadow-md max-w-[90vw] bg-white overflow-hidden right-0 top-12 text-sm">
              <div className="dark flex flex-col cursor-pointer overflow-y-auto p-4">
                  {components.map((component, index) => (
                    <React.Fragment key={index}>{component}</React.Fragment>
                  ))}
                </div>
              </div>
            )}
        </div>
    )
}

export default UserMenu