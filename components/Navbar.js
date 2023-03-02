import React from "react";
import Link from "next/link";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({ style: "normal" }, { subsets: ["latin"] });

export default function Navbar() {
  return (
    <>
      <nav className={montserrat.className}>
        <ul className="flex flex-row justify-evenly font-bold">
          <li className="nav-link hover:underline ">
            <Link href="/" className="text-2xl">
              HOME
            </Link>
          </li>
          <li className="nav-link hover:underline ">
            <Link href="/filmography" className="text-2xl">
              FILMOGRAPHY
            </Link>
          </li>
          {/* <li className="nav-link"><Link href="/compare" className="text-2xl"> Compare</Link></li> */}
          <li className="nav-link hover:underline ">
            <Link href="/login" className="text-2xl">
              SIGN IN
            </Link>
          </li>
          {/* {
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
          } */}
        </ul>
      </nav>
    </>
  );
}
