import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ style: "normal", subsets: ["latin"] });
import cls from "classnames";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const status = async () => {
      if (localStorage.getItem("userEmail")) {
        setIsLoggedIn(true);
      }
    };
    status();
  }, [isLoggedIn]);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/filmography", label: "CINEMATOGRAPHY" },
    { href: "/infographics", label: "INFOGRAPHICS" },
    { href: "/login", label: "SIGN IN/OUT" },
  ];

  return (
    <>
      <nav className={cls(montserrat.className, "pt-4 sm:pt-8 sticky top-0 z-30 backdrop-blur-md bg-[#161616]/80")}>
        <div className="flex items-center justify-between px-4 sm:hidden">
          <span className="text-xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c]">007</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#BF953F] p-2"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className={cls(
          "sm:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}>
          <ul className="flex flex-col items-center gap-4 py-4 font-bold text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c]">
            {navLinks.map((link) => (
              <li key={link.href} className="text-xl">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cls(
                    "relative pb-1",
                    router.pathname === link.href && "font-extrabold"
                  )}
                >
                  {link.label}
                  {router.pathname === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#BF953F]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="hidden sm:flex flex-row flex-wrap font-bold justify-evenly sm:mt-8 text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c]">
          {navLinks.map((link) => (
            <li key={link.href} className="mt-2 text-center sm:mt-8">
              <Link
                href={link.href}
                className={cls(
                  "relative text-xl sm:text-3xl pb-1 group",
                  router.pathname === link.href && "font-extrabold"
                )}
              >
                {link.href === "/" ? <h2>{link.label}</h2> : link.label}
                <span className={cls(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-[#BF953F] transition-transform duration-300 origin-left",
                  router.pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
