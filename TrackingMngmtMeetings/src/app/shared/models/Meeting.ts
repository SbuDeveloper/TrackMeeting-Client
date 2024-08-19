import { MeetingItem } from "./MeetingItem"
import { MeetingType } from "./MeetingType"

export interface Meeting {
    id: number
    name: string
    meetingTypeId: number
    createdOn: string
    meetingType: MeetingType
    meetingItems: MeetingItem[]
  }