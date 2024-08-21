import { ActionItem } from "./ActionItem"
import { MeetingItemHistory } from "./MeetingItemHistory"
import { Status } from "./Status"

export interface MeetingItem {
  id: number
  description: string
  meetingType: string
  status: Status
  statusId: number
  actionItems: ActionItem[]
  meetingItemHistory: MeetingItemHistory[]

}