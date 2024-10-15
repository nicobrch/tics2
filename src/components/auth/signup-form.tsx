"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async () => {
    await signUp.email({
      email,
      password,
      name,
    }, {
      onRequest: (ctx) => {
        //show loading
        console.log(ctx);
      },
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        console.log(ctx.error.message);
        alert(ctx.error.message);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Username</Label>
        <Input
          type="name"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button className="w-full" onClick={handleSignUp}>Log in</Button>
    </div>
  )
}