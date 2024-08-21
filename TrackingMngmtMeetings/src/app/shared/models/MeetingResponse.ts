import { MeetingItem } from "./MeetingItem"
import { MeetingType } from "./MeetingType"

export interface MeetingResponse {
  id: number
  name: string
  meetingTypeId: number
  meetingType: MeetingType
  meetingItems: MeetingItem[],
  createdOn: string
  }