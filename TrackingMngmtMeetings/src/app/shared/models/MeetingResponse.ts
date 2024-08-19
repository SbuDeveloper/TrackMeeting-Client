import { MeetingItem } from "./MeetingItem"

export interface MeetingResponse {
    name: string
    meetingType: string
    meetingItems: MeetingItem[]
  }