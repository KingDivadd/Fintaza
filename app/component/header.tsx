'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { BiMenu, BiX } from "react-icons/bi";
import {useChat} from '@/app/context/ChatContext'

const Header = () => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const {header_nav, setHeader_nav} = useChat()

    // useEffect(() => {
    //     router.push('/auth/login')
    // }, [])

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const nav_to = (navv:string)=>{
        setHeader_nav(navv)
    }

    const handle_signup = ()=>{
        setHeader_nav('pricing')
    }

    return (
        <div className="w-full flex flex-col items-center justify-start bg-blue-600 ">
            <nav className="w-[95%] md:w-[92.5%] lg:w-[90%] mx-auto h-[100px] md:h-[120px] flex items-center justify-between ">
                {/* left nav */}
                <div className=" flex h-full items-center justify-start gap-5">
                    <span className="flex items-center mr-5 cursor-pointer" onClick={()=> setHeader_nav('home') }>
                        <p className="text-xl font-semibold text-white">Fintaza</p>
                        <p className="text-xl font-semibold text-amber-500">Pdl</p>
                    </span>

                </div>
                {/* right nav */}

                <div className=" flex h-full items-center justify-end gap-2 ">
                    
                    <button className="h-[45px] sm:h-[50px] font-[500] text-lg px-3 sm:px-5 flex items-center text-slate-300 hover:text-amber-500  "  onClick={()=> router.push('/auth/login')}>
                        Sign in
                    </button>
                    <button className="h-[45px] sm:h-[50px] font-[500] text-lg px-3 sm:px-5 flex items-center text-slate-300 border-2 border-slate-300 hover:text-amber-500 hover:border-amber-500 "  onClick={()=> router.push('/auth/signup')}>
                        Signup
                    </button>
                </div>
            </nav>

            <div className="lg:w-[70%] md:w-[80%] w-[95%] mx-auto flex flex-col items-start justify-start gap-5 mb-5 sm:mb-10 h-auto  ">
                <p className="text-[30px] md:text-[45px] xl:text-[65px] font-bold text-white">FintazaPdl</p>
                <p className="text-md xl:text-lg md:w-[650px] text-start font-[400] text-white h-auto ">A comprehensive platform for managing loans, streamlining application processes, automating credit evaluation, enabling seamless payments, and enhancing user experience with secure customer and admin portals.</p>

                <span className="w-full flex items-center">
                    <button className="h-[60px] text-xl font-[400] bg-amber-500 px-5 flex items-center text-white hover:bg-amber-600 mt-5"onClick={()=> router.push('/auth/signup')}>
                        Proceed
                    </button>
                </span>

            </div>



        </div>
    );
};

export default Header;
