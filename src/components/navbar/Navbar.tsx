import Link from "next/link";
import Logo from "@/components/Logo";
import DarkToggle from "@/components/navbar/dark-toggle";
import Menu from "./menu";
import BannerCategories from "../bannerCategories";

function Navbar() {
  const list = [
    { id: 1, title: "Blog", path: "/blog", auth: true },
    { id: 2, title: "Topics", path: "/categories", auth: true },
    { id: 3, title: "Trending", path: "/trending", auth: true },
  ];

  return (
    <div>
      <nav className=" text-black bg-white border-black  dark:bg-gradient-radial dark:bg-black min-w-full sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-auto">
          <div className="flex items-center">
            <Link href="/about" className="flex items-center">
              <Logo />
            </Link>
            <DarkToggle />
          </div>
          <div className="hidden md:flex md:flex-grow md:justify-end">
            <ul className="bg-white  dark:bg-black font-medium  flex justify-end align-middle  mr-10">
              {list
                .filter((link) => link.auth == true)
                .map((link) => {
                  return (
                    <li key={link.id} className="">
                      {link.auth ? (
                        <Link
                          className="block  ml-10   hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
            </ul>
          </div>
          <div>
            <Menu />
          </div>
        </div>
      </nav>
      <BannerCategories />
    </div>
  );
}

export default Navbar;
