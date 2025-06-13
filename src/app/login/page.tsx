'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
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
import { Loader2 } from 'lucide-react'

type TLoginForm = {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>()

  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    // Simulate API call by waiting for a promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // For simplicity, we're not validating credentials, just submitting
    login()
    document.cookie = 'mock_auth_token=true; path=/; max-age=86400;' // Sets a cookie for 1 day
    router.push('/')
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
                  <p className="text-xs text-red-500">{errors.email.message}</p>
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
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
