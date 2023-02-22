import React from "react";
import Link from "next/link";
import { isLoggedIn } from "../lib/isLoggedIn";

export default function Navbar() {


  return (
    <>
      <nav>
        <ul className="flex flex-row justify-evenly font-bold">
          <li className="nav-link hover:underline ">
            <Link href="/" className="text-2xl">
              {" "}
              Home
            </Link>
          </li>
          <li className="nav-link hover:underline ">
            <Link href="/filmography" className="text-2xl">
              {" "}
              Filmography
            </Link>
          </li>
          {/* <li className="nav-link"><Link href="/compare" className="text-2xl"> Compare</Link></li> */}
          
          {
            isLoggedIn  
                        ?     
                            <li className="nav-link hover:underline ">
                              <Link href="/login" className="text-2xl">
                                {" "}
                                Logout
                              </Link>
                            </li>
                        :
                            <li className="nav-link hover:underline ">
                              <Link href="/login" className="text-2xl">
                                {" "}
                                Login
                              </Link>
                            </li>
          }
          

        </ul>
      </nav>
    </>
  );
}
