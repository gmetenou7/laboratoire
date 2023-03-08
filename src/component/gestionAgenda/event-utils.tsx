import { EventInput } from '@fullcalendar/react'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: any[] = [
  {
    id1: createEventId(),
    title: 'All-day event',
    date: todayStr,
    name: 'jjjdjd'
  },
  {
    id1: createEventId(),
    title: 'Timed event',
    date: todayStr + 'T20:00:00',
    name: 'test'
  }
]

export function createEventId() {
  return String(eventGuid++)
}