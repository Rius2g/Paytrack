'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation';


const Logo = () => {
    const router = useRouter();

    return (
        <Image 
        onClick={() => router.push('/')}
        alt="logo"
        src="/../public/images/TransperantBackGround.png"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"


        >

        </Image>
    )
}

export default Logo