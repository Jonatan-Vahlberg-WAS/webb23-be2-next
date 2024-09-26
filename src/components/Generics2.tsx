"use client";

import ApiKit from "@/utils/ApiKit";
import { useEffect, useState } from "react";

const userKit = new ApiKit<User>("https://jsonplaceholder.typicode.com/users/");

function Generics2() {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState<User[]>([]);
  const [userDetail, setUserDetail] = useState<User | null>(null)

  useEffect(() => {
    getUsers()
    userKit.addItem({
      email: "",
      name: "",
      phone: ""
    })
  }, [search]);
  
  async function getUsers() {
    try {
      const params = search ? { q: search} : undefined
      const _users = await userKit.getList(params);
      setUsers(_users);
    } catch (error) {
      console.warn("Error fetching users:", error);
    }
  }

  async function getUser(id: number) {
    try {
      const _user = await userKit.getItemOnId(id);
      setUserDetail(_user)
    } catch (error) {
      console.warn("Error fetching users:", error);
    }
  }

  return (
    <div className="space-y-6">
      <input value={search} onChange={(e) => setSearch(e.target.value) } placeholder="Serach..." type="search"/>
      {users.map((user) => (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-medium text-slate-800">{user.email}</p>
          <p className="text-sm text-slate-500">{user.name}</p>
          <button onClick={() => getUser(user.id)}>
            Select user
          </button>
        </div>
      ))}

      User detail:
      {userDetail && (
         <div className="space-y-6">
         {userDetail && (
           <div className="bg-white shadow-md rounded-lg p-6">
             <p className="text-lg font-medium text-slate-800">{userDetail.name}</p>
             <p className="text-sm text-slate-500">{userDetail.email}</p>
             <p className="text-sm text-slate-500">{userDetail.phone}</p>
           </div>
         )}
       </div>
      )}
    </div>
  );
}

export default Generics2;
