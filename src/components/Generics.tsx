"use client";

import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

async function getData<T>(baseUrl: string | URL): Promise<T> {
  const response = await fetch(baseUrl)
  if(response.ok){
    return await response.json()
  }
  throw new Error("Unable to fetch data")
}

function Generics() {
  const [user, setUser] = useState<User | null>(null);
  //TODO: userPosts

  useEffect(() => {
    getUser(5)
  },[])

  async function getUser(userId: number) {
    const _user = await getData<User>(`https://jsonplaceholder.typicode.com/users/${userId}`)
    setUser(_user)
  }

  //TODO: https://jsonplaceholder.typicode.com/posts?userId=1
  //TODO: get user posts if based on user id

  return (
    <div>
     
      {user && (
        <pre>
          <p>{user.email}</p>
          <p>{user.name}</p>
        </pre>
      )}

      {/* //TODO: render user posts */}
    </div>
  );
}

export default Generics;
