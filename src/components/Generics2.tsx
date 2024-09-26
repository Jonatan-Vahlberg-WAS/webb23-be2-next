"use client";

import ApiKit from "@/utils/ApiKit";
import { useEffect, useState } from "react";

const userKit = new ApiKit<User>("https://jsonplaceholder.typicode.com/users/");

function Generics2() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    try {
      const _users = await userKit.getList({
        q: "Clementine"
      });
      setUsers(_users);
    } catch (error) {
      console.warn("Error fetching users:", error);
    }
  }

  return (
    <div className="space-y-6">
      {users.map((user) => (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-medium text-slate-800">{user.email}</p>
          <p className="text-sm text-slate-500">{user.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Generics2;
