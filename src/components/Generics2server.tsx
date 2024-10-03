
import { searchAction } from "@/actions/search";
import ApiKit from "@/utils/ApiKit";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

const userKit = new ApiKit<User>("https://jsonplaceholder.typicode.com/users/");



type Generics3ServerProps = {
  search?: string
}

async function Generics3Server({search = " "}: Generics3ServerProps) {

  const users = await userKit.getList({
    q: search
  })

  return (
    <div className="space-y-6">
      <form action={searchAction}>
        <input name="search" placeholder="Serach..." type="search"/>
        <button type="submit">
          Search
        </button>
      </form>
      {users.map((user) => (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-medium text-slate-800">{user.email}</p>
          <p className="text-sm text-slate-500">{user.name}</p>
          {/* <button onClick={() => getUser(user.id)}>
            Select user
          </button> */}
        </div>
      ))}

      User detail:
      {/* {userDetail && (
         <div className="space-y-6">
         {userDetail && (
           <div className="bg-white shadow-md rounded-lg p-6">
             <p className="text-lg font-medium text-slate-800">{userDetail.name}</p>
             <p className="text-sm text-slate-500">{userDetail.email}</p>
             <p className="text-sm text-slate-500">{userDetail.phone}</p>
           </div>
         )}
       </div>
      )} */}
    </div>
  );
}

export default Generics3Server;
