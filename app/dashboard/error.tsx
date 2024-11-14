'use client'

import { FC } from 'react'

const HomeError: FC<{ error: any; reset: any }> = ({ error, reset }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2>Something bad happened :( </h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default HomeError
