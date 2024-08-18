import { ActionItem } from "./ActionItem"

export interface MeetingItem {
  id: number
  description: string
  meetingType: string
  meeting: string
  status: string
  actionItems: ActionItem[]

}