"use client";

import { useUser } from "@/context/user";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";

export default function LoginForm() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    user.actions.login(
      email,
      password,
      () => {},
      () => {}
    );
    console.log({
      email,
      password,
    });
  };
  if(user.token ){
    return (
        <Button>
            Logout
        </Button>
    )
  }
  return (
    <form onSubmit={login}>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value as string)}
      />
      <Input
        placeholder="********"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value as string)}
      />
      <Button variant="default">Login</Button>
    </form>
  );
}
