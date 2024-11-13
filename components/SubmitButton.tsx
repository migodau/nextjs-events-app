'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

interface Props {
  label: string
}

const SubmitButton = ({ label, ...props }: Props) => {
  const { pending } = useFormStatus()
  return (
    <Button {...props} type="submit" isLoading={pending}>
      {label}
    </Button>
  )
}

export default SubmitButton
