'use client'
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import SubmitButton from './SubmitButton'
import { useFormState, useFormStatus } from 'react-dom'
import { SignInUser } from '@/actions/auth'

type FormState = {
  message: string | null
}
const initialState: FormState = { message: null }

const SigninForm = () => {
  const [formState, action] = useFormState(SignInUser, initialState)

  return (
    <form
      action={action}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign in</h3>
      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
        type="email"
      />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />
      <SubmitButton label="Sign in" />
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
      {formState?.message && <p className="text-danger">{formState.message}</p>}
    </form>
  )
}

export default SigninForm