'use client';

import { Avatar } from '@mui/material';
import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from 'react';
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import JobModal from '../Modals/JobModal';


const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                onClick={() => {}}
                className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
                "
                >
                </div>
                <div
                onClick={toggleOpen}
                className="
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
                <div
                className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                ">
                <div className="flex flex-col cursor-pointer">
                    <>
                <LoginModal />
                <RegisterModal />
                <JobModal />
                    </>
                </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu