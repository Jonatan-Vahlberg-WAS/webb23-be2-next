"use client";

import { useUser } from "@/context/user";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";

export default function AuthForm() {
  const user = useUser();

  const [email, setEmail] = useState("Angelo26@hotmail.com");
  const [password, setPassword] = useState("password");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const login = () => {
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) =>  {
    e.preventDefault()
    if(isLogin) {
      login()
    }
    //TODO: add register
  }

  if (user.token) {
    return <Button onClick={user.actions.logout}>Logout</Button>;
  }
  return (
    <form onSubmit={onSubmit}>
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
      {/* TODO add name handling */}
      <Button variant="default">{!isLogin ? "Register" : "Login"}</Button>
      <span> or </span>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Register" : "Login"}
      </Button>
    </form>
  );
}
