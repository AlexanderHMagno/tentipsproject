"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import DarkToggle from "@/components/dark-toggle";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const authenticated = status === "authenticated";

  const router = useRouter();

  const list = [
    // { id: 1, title: "Home", path: "/"},
    { id: 3, title: "Blog", path: "/blog", auth: true },
    { id: 2, title: "Topics", path: "/categories", auth: true },
    { id: 4, title: "About", path: "/about", auth: !authenticated },
    { id: 5, title: "Contact", path: "/contact", auth: !authenticated },
    { id: 6, title: "Compose", path: "/blog/create", auth: authenticated },
    { id: 7, title: "Queue", path: "/blog/queue", auth: authenticated },
    { id: 8, title: "Community  ", path: "/community", auth: authenticated },
    // { id: 9, title: "Login", path: "/admin/login", auth: !authenticated },
  ];

  const closeProgam = () => {
    signOut();
    router.push("/");
  };

  if (status === "loading")
    return (
      <nav className=" text-black bg-white border-black  dark:bg-gradient-radial dark:bg-black min-w-full ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-auto">
          <Link href="/about" className="flex items-center">
            <Logo />
          </Link>
        </div>
      </nav>
    );

  return (
    <nav className=" text-black bg-white border-black  dark:bg-gradient-radial dark:bg-black min-w-full sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-auto">
        <Link href="/about" className="flex items-center">
          <Logo />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${open ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            {list
              .filter((link) => link.auth == true)
              .map((link) => {
                return (
                  <li key={link.id} onClick={() => setOpen(false)}>
                    {link.auth ? (
                      <Link
                        className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        href={link.path}
                      >
                        {link.title}
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            <hr className="mb-5 md:hidden"></hr>
            <li className="flex" onClick={() => setOpen(false)}>
              <DarkToggle />

              {authenticated && (
                <span className="ml-5">
                  <Button
                    className=" -m-2 block py-2 pl-3 pr-4  rounded bg-teal-500 text-white "
                    onClick={() => closeProgam()}
                  >
                    LogOut
                  </Button>
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
