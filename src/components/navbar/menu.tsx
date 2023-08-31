"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Menu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const authenticated = status === "authenticated";

  const router = useRouter();

  const list = [
    { id: 1, title: "Blog", path: "/blog", auth: true, bigScreen: false },
    {
      id: 2,
      title: "Topics",
      path: "/categories",
      auth: true,
      bigScreen: false,
    },
    { id: 3, title: "Write", path: "/write", auth: true, bigScreen: true },
    {
      id: 4,
      title: "Trending",
      path: "/trending",
      auth: true,
      bigScreen: false,
    },
    // { id: 4, title: "Compose", path: "/blog/create", auth: authenticated, bigScreen: true },
    // { id: 5, title: "Queue", path: "/blog/queue", auth: authenticated, bigScreen: true },
    // { id: 6, title: "Community  ", path: "/community", auth: authenticated, bigScreen: true },
  ];

  const LoginSystem = () => {
    if (authenticated) {
      signOut();
      router.push("/");
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="border-0 inline-flex items-center  w-10 h-10 justify-center text-sm  rounded-lg  hover:bg-gray-50 focus:outline-none  focus:text-brand dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5 border-0"
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
        className={`w-full z-50 absolute md:w-[250px] right-0 md:right-28  ${
          open ? "" : "hidden"
        }`}
        id="navbar-default"
      >
        <ul className="bg-white   dark:bg-black font-medium flex flex-col p-4 md:p-5 md:w-[250px] md:float-right mt-4 border border-gray-100 rounded-lg  ">
          {list
            .filter((link) => link.auth == true)
            .map((link) => {
              return (
                <li
                  key={link.id}
                  onClick={() => setOpen(false)}
                  className={`${
                    link.bigScreen ? "" : "md:hidden md:invisible"
                  }  mb-5`}
                >
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
          <hr className="mb-5 "></hr>
          <li className="flex" onClick={() => setOpen(false)}>
            <span className="ml-5 w-full ">
              <Button
                className=" -m-2 block py-2 pl-3 pr-4 w-full   rounded bg-brand text-white hover:bg-brand "
                onClick={() => LoginSystem()}
              >
                {authenticated ? "Log Out" : "Log In"}
              </Button>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
