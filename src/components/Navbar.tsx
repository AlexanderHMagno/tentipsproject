'use client'
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import DarkToggle from '@/components/dark-toggle'
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';




function Navbar() {

  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';
  const router = useRouter();


  const list = [
    // { id: 1, title: "Home", path: "/"},
    { id: 3, title: "Blog", path: "/blog", auth: authenticated},
    { id: 4, title: "About", path: "/about" ,  auth: !authenticated},
    { id: 5, title: "Contact", path: "/contact" ,  auth: !authenticated},
    { id: 6, title: "Dashboard", path: "/dashboard", auth: authenticated},
    { id: 7, title: "Community  ", path: "/community", auth: authenticated},
    { id: 8, title: "Login", path: "/admin/login", auth: !authenticated},
  ];

  const closeProgam = () => {
    signOut();
    router.push("/");
  }



  return (<nav className=" text-black bg-white border-black  dark:bg-gradient-radial dark:bg-black min-w-full ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="./" className="flex items-center">
        <Image width={150} height={100} src="/images/logo.png" alt="10 tips idea" />
        
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 "  >
      {list.filter(link => link.auth == true).map(link => {
        return (
          <li key={link.id}>
            {link.auth 
              ? <Link className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" href={link.path} >{link.title}</Link>
              : ""
            }
          </li>)

        })
      }
        <li >
        <DarkToggle/>
        </li>
        { authenticated  && 
        <li className='ml-10'>
          <Button className=" -m-2 block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={() => closeProgam()}>
            LogOut
          </Button>
        </li>
        } 
      </ul>
      
    </div>
  </div>
</nav>
  )
}








export default Navbar