import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <Link href="/about" className="flex items-center">
          <Image
            width={150}
            height={150}
            src="/images/logo.png"
            alt="10 tips idea"
            className="self-baseline"
          />
        </Link>
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-3">About Us</h2>
          <ul className="list-none">
            <li className="mb-1">
              <a href="#" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="hover:text-gray-400">
                Who We Are
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="hover:text-gray-400">
                Terms
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="hover:text-gray-400">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-3">Privacy</h2>
          <ul className="list-none">
            <li className="mb-1">
              <a href="#" className="hover:text-gray-400">
                Cookies
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="hover:text-gray-400">
                Privacy
              </a>
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
