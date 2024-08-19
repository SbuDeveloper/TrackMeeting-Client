import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeetingType } from '../shared/models/MeetingType';
import { MeetingItem } from '../shared/models/MeetingItem';
import { CreateMeetingRequest } from '../shared/models/CreateMeetingRequest';
import { MeetingResponse } from '../shared/models/MeetingResponse';

@Injectable({
  providedIn: 'root'
})
export class MeetingServiceService {
  baseUrl = "http://localhost:5240/api/Meeting/";

  constructor(private http: HttpClient) { }

  getTypes() {
    return this.http.get<MeetingType[]>(this.baseUrl + 'getMeetingType');
  }

  getMeetingItems(meetingTypeId: number){
    return this.http.get<MeetingItem[]>(this.baseUrl + 'meetingItems?MeetingTypeId=' + meetingTypeId);
  }

  createNewMeeing(_createMeetingRequest: CreateMeetingRequest) {
    return this.http.post<MeetingResponse>(this.baseUrl + 'captureNewMeeting', _createMeetingRequest);

  }
}
