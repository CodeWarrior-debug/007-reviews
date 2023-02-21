import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../lib/db";

//Thanks to judygab for her project at: https://github.com/judygab/web-dev-projects-2/tree/react-firebase-auth/react-firebase-auth
const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

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
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="grid place-items-center">
      {authUser ? (
        <>
          <p className="bg-slate-300 text-2xl p-2 rounded font-semibold">{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut} className="styledBtn" >Sign Out</button>
        </>
      ) : (
        <p className="bg-slate-300 text-2xl p-2 rounded font-semibold">Currently Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;