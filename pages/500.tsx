"use client";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-items-center h-[80vh]">
      <div className="grid place-items-center pl-48 pr-48">
        <h1 className="text-5xl leading-loose">PAGE NOT FOUND</h1>
        <p className=" text-2xl text-center">
          This page was collateral damage in Bond&apos;s most recent mission.
          <br />Q will be furious when he finds out, so keep it confidential and
          return to&nbsp;
          <Link href="/" className="font-bold underline">
            headquarters.
          </Link>
        </p>
      </div>
    </div>
  );
}
