import 'server-only'
import { COOKIE_NAME } from './constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserFromToken } from './authTools'
import { cache } from 'react'

// because we are using cookies it won't cache by default
// We can decide to cache by request, so on the same request it won't do the same function more than once
export const getCurrentUser = cache(async () => {
    const token = cookies().get(COOKIE_NAME)

    if (!token) redirect('/signin')

    const user = await getUserFromToken(token)
    if (!user) redirect('/signin')
    return user

})