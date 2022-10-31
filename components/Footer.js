import React from 'react';
import Link from 'next/link';

export default function Footer() {
  
  const Login = ()=>{
    
    return (
      <li className="nav-link"><Link href="/login" className="text-2xl"> Login</Link></li>
    )
  }

  return (


    <>
                <nav>
              <ul className="flex flex-row justify-evenly underline font-bold" >
                <li className="nav-link"><Link href="/" className="text-2xl"> Home</Link></li>
                <li className="nav-link"><Link href="/filmography" className="text-2xl"> Filmography</Link></li>
                <li className="nav-link"><Link href="/compare" className="text-2xl"> Compare</Link></li>
                <li className="nav-link"><Link href="/charts" className="text-2xl"> Charts</Link></li>
                <Login />

                <li> Compare </li>
                <li> Charts</li>
                
              </ul>
            </nav>
    </>
  );
}
