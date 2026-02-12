import { useEffect, useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ style: "normal", subsets: ["latin"] });
import cls from "classnames";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = async () => {
      if (localStorage.getItem("userEmail")) {
        setIsLoggedIn(true);
      }
    };
    status();
  }, [isLoggedIn]);

  return (
    <>
      <nav className={cls(montserrat.className, "pt-8 bg-[#161616]")}>
        <ul className="flex flex-row flex-wrap font-bold justify-evenly sm:mt-8 text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c]">
          <li className="mt-2 text-xl text-center sm:mt-8 md:text-3xl hover:underline ">
            <Link href="/">
              <h2>HOME</h2>
            </Link>
          </li>
          <li className="mt-2 text-center sm:mt-8 hover:underline ">
            <Link href="/filmography" className="text-xl sm:text-3xl">
              CINEMATOGRAPHY
            </Link>
          </li>
          <li className="mt-2 text-center sm:mt-8 hover:underline ">
            <Link href="/infographics" className="text-xl sm:text-3xl">
              INFOGRAPHICS
            </Link>
          </li>
          <li className="mt-2 text-center sm:mt-8 hover:underline ">
            <Link href="/login" className="text-xl sm:text-3xl">
              {" "}
              SIGN IN/OUT
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
