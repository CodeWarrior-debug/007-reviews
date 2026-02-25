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
          <p className="bg-[#252429] text-xl text-white ring-1 ring-[#BF953F]/30 rounded-lg p-2 font-semibold">{`Signed In as ${authUser.email}`}</p>
          <div className="mt-4">
            <button
              onClick={userSignOut}
              className="bg-transparent border border-[#BF953F] text-[#FCF6ba] hover:bg-[#BF953F]/20 transition-all duration-300 font-semibold h-11 rounded pl-4 pr-4 m-2"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <p className="bg-[#252429] text-white text-xl p-2 rounded-lg ring-1 ring-[#BF953F]/30 font-semibold">
          Currently Signed Out
        </p>
      )}
    </div>
  );
};

export default AuthDetails;
