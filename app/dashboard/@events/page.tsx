import { getEvents } from '@/utils/events'
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
  draft: 'warning',
  live: 'success',
  started: 'primary',
  ended: 'default',
  canceled: 'danger',
}

const EventsSlot = async () => {
  const user = await getCurrentUser()
  const events = await getEvents(user.id)

  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-full">
        <h2 className="text-center text-xl">{`Latest Events`}</h2>
        <div className="rounded-md border border-default-100 my-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="border-b border-default-100 p-2 flex gap-2"
            >
              <Link href={`/dashboard/events/${event.id}`}>
                <span>{event.name}</span>
              </Link>
              <span>
                <Chip size="sm" color={statusColors[event.status]}>
                  {event.status}
                </Chip>
              </span>
              <span>
                <Chip size="sm" variant="faded">
                  {event.name}
                </Chip>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsSlot
