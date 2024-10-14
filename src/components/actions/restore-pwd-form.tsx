"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { restorePasswordAction } from "@/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: ""
};

export default function RestorePasswordForm() {
  const [state, action] = useFormState(restorePasswordAction, initialState);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
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
          <Button type="submit" className="w-full">Change Password</Button>
        </form>
      </CardContent>
      <CardFooter>
        {state.message && <p className="text-red-500">{state.message}</p>}
      </CardFooter>
    </Card>
  )
}