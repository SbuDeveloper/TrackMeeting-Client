import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeetingType } from '../shared/models/MeetingType';
import { MeetingItem } from '../shared/models/MeetingItem';
import { CreateMeetingRequest } from '../shared/models/CreateMeetingRequest';
import { MeetingResponse } from '../shared/models/MeetingResponse';
import { Status } from '../shared/models/Status';
import { UpdateMeetingRequest } from '../shared/models/UpdateMeetingRequest';

@Injectable({
  providedIn: 'root'
})
export class MeetingServiceService {
  baseUrl = "http://localhost:5240/api/Meeting/";

  constructor(private http: HttpClient) { }

  getTypes() {
    return this.http.get<MeetingType[]>(this.baseUrl + 'getMeetingType');
  }

  getStatuses() {
    return this.http.get<Status[]>(this.baseUrl + 'getStatus');
  }

  getMeeting(meetingTypeId: number){
    let meeting = this.http.get<MeetingResponse>(this.baseUrl + 'getMeeting?MeetingTypeId=' + meetingTypeId);
    return meeting
  }

  createNewMeeing(_createMeetingRequest: CreateMeetingRequest) {
    return this.http.post<MeetingResponse>(this.baseUrl + 'captureNewMeeting', _createMeetingRequest);

  }

  updateMeetingStatus(_updateMeetingRequest: UpdateMeetingRequest) {
    return this.http.post<boolean>(this.baseUrl + 'updateMeetingItemStatus', _updateMeetingRequest);

  }
}
