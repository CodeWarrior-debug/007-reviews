import { useEffect, useState } from "react";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ style: "normal" }, { subsets: ["latin"] });

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => 
{    const status = async () => {
      if (localStorage.getItem("userEmail")) {
        setIsLoggedIn(true);
      }
    };
    status();
    }
  , [isLoggedIn]);

  return (
    <>
      <nav className={montserrat.className}>
        <ul className="flex flex-row flex-wrap justify-evenly font-bold">
          <li className="nav-link hover:underline ">
            <Link href="/" className="text-2xl">
              HOME
            </Link>
          </li>
          <li className="nav-link hover:underline ">
            <Link href="/filmography" className="text-2xl">
              CINEMATOGRAPHY
            </Link>
          </li>
          <li className="nav-link hover:underline ">
            <Link href="/infographics" className="text-2xl">
              INFOGRAPHICS
            </Link>
          </li>
          <li className="nav-link hover:underline ">
              <Link href="/login" className="text-2xl">
                {" "}
                SIGN IN/OUT
              </Link>
            </li>

        </ul>
      </nav>
    </>
  );
}
