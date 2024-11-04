"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth-client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn.email({
      email: email,
      password: password,
    }, {
      onRequest: () => {
        //show loading
      },
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSignIn}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          placeholder="Enter your email"
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          name={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button className="w-full" type="submit">Log in</Button>
    </form>
  )
}