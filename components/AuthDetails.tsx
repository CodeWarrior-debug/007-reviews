import { onAuthStateChanged, signOut, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../lib/db";

const AuthDetails: React.FC = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="grid place-items-center">
      {authUser ? (
        <>
          <p className="bg-slate-300 text-2xl text-black p-2 rounded font-semibold">{`Signed In as ${authUser.email}`}</p>
          <br />
          <button
            onClick={userSignOut}
            className="bg-transparent border border-[#BF953F] text-[#FCF6ba] hover:bg-[#BF953F]/20 transition-all duration-300 font-semibold h-11 rounded pl-4 pr-4 m-2"
          >
            Sign Out
          </button>
        </>
      ) : (
        <p className="bg-slate-300 text-black text-2xl p-2 rounded font-semibold">
          Currently Signed Out
        </p>
      )}
    </div>
  );
};

export default AuthDetails;
