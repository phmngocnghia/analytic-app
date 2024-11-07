import { Dayjs } from "dayjs"

export type DateRange = [Dayjs, Dayjs] | null

export type FootballItem = {
  value: number,
  time: string
}