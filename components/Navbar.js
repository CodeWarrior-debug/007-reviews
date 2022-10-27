import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
                <nav>
              <ul className="flex flex-row justify-evenly underline font-bold" >
                <li className="mr-2 ml-2">
                  <Link href="/" className="text-2xl"> Home</Link>
                </li>
                <li>
                  <Link href="/filmography" className="mr-2 ml-2"> Filmography</Link>
                </li>
                <li> Compare </li>
                <li> Charts</li>
                <li> Charts</li>
              </ul>
            </nav>
    </>
  );
}
