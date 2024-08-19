import { ActionItem } from "./ActionItem"
import { Meeting } from "./Meeting"
import { MeetingItemHistory } from "./MeetingItemHistory"
import { Status } from "./Status"

export interface MeetingItem {
  id: number
  description: string
  meetingType: string
  meeting: Meeting
  status: Status
  statusId: number
  actionItems: ActionItem[]
  meetingItemHistory: MeetingItemHistory[]

}