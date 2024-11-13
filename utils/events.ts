import 'server-only'
import { db } from '@/db/db'
import { asc, eq } from 'drizzle-orm'
import { events, rsvps } from '@/db/schema'
import { delay } from './delay'

export const getEvents = async (userId: string) => {
    await delay(1000)

    const eventsData = await db
        .select({
            id: events.id,
            name: events.name,
            startOn: events.startOn,
            status: events.status,
        })
        .from(events)
        .leftJoin(rsvps, eq(rsvps.eventId, events.id))
        .where(eq(events.createdById, userId))
        .orderBy(asc(events.startOn))
        .limit(5)
        .execute()

    return eventsData ?? []
}