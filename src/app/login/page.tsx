'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/auth'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    // Simulate API call
    setTimeout(() => {
      // For simplicity, we're not validating credentials, just checking if fields are not empty
      if (data.email && data.password) {
        login()
        localStorage.setItem('mock_auth_token', 'mock_auth_token')
        router.push('/')
      }
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    {(errors.email as any).message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {(errors.password as any).message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
