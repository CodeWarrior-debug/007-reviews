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
        <ul className="flex flex-row flex-wrap font-bold justify-evenly text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c]">
          <li className="mt-2 text-xl text-center md:text-3xl hover:underline ">
            <Link href="/" >
              <h2>HOME</h2>
            </Link>
          </li>
          <li className="mt-2 text-xl text-center md:text-3xl hover:underline ">
            <Link href="/filmography" >
              CINEMATOGRAPHY
            </Link>
          </li>
          <li className="mt-2 text-xl text-center md:text-3xl hover:underline ">
            <Link href="/infographics" >
              INFOGRAPHICS
            </Link>
          </li>
          <li className="mt-2 text-xl text-center md:text-3xl hover:underline ">
              <Link href="/login" >
                {" "}
                SIGN IN/OUT
              </Link>
            </li>

        </ul>
      </nav>
    </>
  );
}
