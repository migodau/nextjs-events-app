'use server'

import { cookies } from 'next/headers'
import { signin, signup } from '@/utils/authTools'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'


const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
});

export const registerUser = async (prevState: any, formData: FormData) => {
    try {
        const data = authSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        const { token } = await signup(data);
        cookies().set(COOKIE_NAME, token);
    } catch (error) {
        console.error(error);
        return { message: 'Failed to Sign you up' };
    }

    redirect('/dashboard');
}

export const SignInUser = async (prevState: any, formData: FormData) => {
    try {
        const data = authSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        const { token } = await signin(data);
        cookies().set(COOKIE_NAME, token);
    } catch (error) {
        console.error(error);
        return { message: 'Failed to Sign you in' };
    }

    redirect('/dashboard');
}