"use client";

import { useUser } from "@/context/user";
import { PropsWithChildren } from "react";

type IsAuthedProps = PropsWithChildren & {
  message?: string;
};

function IsAuthed({ message, children }: IsAuthedProps) {
  const user = useUser();
  if (user.user) {
    return children;
  }
  if (message) {
    return (
      <div className="p-4 rounded-md bg-red-100 text-red-800 flex items-center justify-center">
        <p className="mb-0">{message}</p>
      </div>
    );
  }
  return null;
}

export default IsAuthed
