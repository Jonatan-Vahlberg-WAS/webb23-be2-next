"use client";

import { use, useEffect, useState } from "react";

async function getData<T>(baseUrl: string | URL): Promise<T> {
  const response = await fetch(baseUrl);
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Unable to fetch data");
}

function Generics() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    getUser(5);
  }, []);

  useEffect(() => {
    if (user) {
      getUserPosts(user.id);
    }
  }, [user]);

  async function getUser(userId: number) {
    const _user = await getData<User>(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    setUser(_user);
  }

  async function getUserPosts(userId: number) {
    const _posts = await getData<UserPost[]>(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    setPosts(_posts);
  }

  return (
    <div className="space-y-6">
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-medium text-slate-800">{user.email}</p>
          <p className="text-sm text-slate-500">{user.name}</p>
        </div>
      )}

      {user && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Posts</h2>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={index} className="border-b border-slate-200 pb-4">
                <p className="text-lg font-semibold text-slate-900">
                  {post.title}
                </p>
                <p className="text-sm text-slate-600 mt-2">{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Generics;
