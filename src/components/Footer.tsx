import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div>
          <Logo />
        </div>
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-3">About Us</h2>
          <ul className="list-none">
            <li className="mb-1">
              <Link href="/about" className="hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-gray-400">
                Who We Are
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-gray-400">
                Terms
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-gray-400">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-3">Privacy</h2>
          <ul className="list-none">
            <li className="mb-1">
              <Link href="#" className="hover:text-gray-400">
                Cookies
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-gray-400">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p>&copy; 2021 10 Tips. All rights reserved.</p>
      </div>
    </div>
  );
}
