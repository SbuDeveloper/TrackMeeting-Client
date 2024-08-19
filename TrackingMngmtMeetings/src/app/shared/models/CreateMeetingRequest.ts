import { SelectionModel } from "@angular/cdk/collections"
import { MeetingItem } from "./MeetingItem"

export interface CreateMeetingRequest {
    name: string
    meetingTypeId: number
    meetingItems: MeetingItem[]
  }