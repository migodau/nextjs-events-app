import { getRsvps } from '@/utils/rsvps'
import { getCurrentUser } from '@/utils/users'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

type StatusColor =
  | 'warning'
  | 'success'
  | 'primary'
  | 'danger'
  | 'default'
  | 'secondary'
  | undefined

const statusColors: Record<string, StatusColor> = {
  going: 'primary',
  maybe: 'warning',
  'not-going': 'danger',
}

const RspvSlot = async () => {
  const user = await getCurrentUser()
  const data = await getRsvps(user.id)

  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-full">
        <h2 className="text-center text-xl">{`RSVPs`}</h2>
        <div className="rounded-md border border-default-100 my-8">
          {data.map(({ rsvps, events, attendees }) => (
            <div
              key={rsvps?.id}
              className="border-b border-default-100 p-2 flex gap-2"
            >
              <span>{attendees.name}</span>
              <span>
                <Chip
                  size="sm"
                  color={statusColors[rsvps?.status || 'default']}
                >
                  {rsvps?.status}
                </Chip>
              </span>
              <span>
                <Link href={`/dashboard/events/${events?.id}`}>
                  <Chip size="sm" variant="faded">
                    {events?.name}
                  </Chip>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RspvSlot
