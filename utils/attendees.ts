import 'server-only'
import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { delay } from './delay'
import { memoize } from 'nextjs-better-unstable-cache'

export const getAttendeesCount = memoize(async (userId: string) => {
    await delay(1000)

    const counts = await db
        .select({
            // totalAttendees: sql`count(distinct ${attendees.id})`,
            totalAttendees: sql<number>`count(${attendees.id})`,
        })
        .from(events)
        .leftJoin(rsvps, eq(rsvps.eventId, events.id))
        .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
        .where(eq(events.createdById, userId))
        .groupBy(events.createdById)
        .execute()

    const total = counts[0].totalAttendees
    return total
}, {
    persist: true,
    revalidateTags: () => ['dashboard:attendees'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'dashboard:attendees',
})
