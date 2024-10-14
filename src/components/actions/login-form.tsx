"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { loginAction } from "@/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: ""
};

export default function LoginForm() {
  const [state, action] = useFormState(loginAction, initialState);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">Log in</Button>
        </form>
      </CardContent>
      <CardFooter>
        {state.message && <p className="text-red-500">{state.message}</p>}
      </CardFooter>
    </Card>
  )
}