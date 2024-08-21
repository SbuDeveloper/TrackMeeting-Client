import { Component, OnInit } from '@angular/core';
import { MeetingType } from 'src/app/shared/models/MeetingType';
import { MeetingServiceService } from '../meeting-service.service';
import { MeetingItem } from 'src/app/shared/models/MeetingItem';
import { SelectionModel } from '@angular/cdk/collections';
import { CreateMeetingRequest } from 'src/app/shared/models/CreateMeetingRequest';
import { MeetingResponse } from 'src/app/shared/models/MeetingResponse';
import { MeetingItemHistory } from 'src/app/shared/models/MeetingItemHistory';
import { Status } from 'src/app/shared/models/Status';
import { UpdateMeetingRequest } from 'src/app/shared/models/UpdateMeetingRequest';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createMeetingRequest: CreateMeetingRequest = {
    name: '',
    meetingTypeId: 0,
    meetingItems: []
  }

  updateMeetingRequest: UpdateMeetingRequest = {
    meetingItemId: 0,
    statusId: 0
  }

  meetingType: MeetingType = {
    id: 0,
    name: ''
  }

  meetingResponse: MeetingResponse = {
    id: 0,
    meetingTypeId: 0,
    meetingType: this.meetingType,
    meetingItems: [],
    createdOn: '',
    name: ''
  }

  statuses: Status[] = [];
  meetingTypes: MeetingType[] = [];
  meetingItemHistory: MeetingItemHistory[] = []
  meetingTypeId: number = 0;
  newMeetingCreated: boolean = false
  meetingItemStatusUpdated = false

  selection = new SelectionModel<MeetingItem>(true, []);


  constructor(private meetingService: MeetingServiceService, ) { }

  ngOnInit(): void {
    this.getMeetingType();
    this.getStatus();
  }

  getMeetingType(){
    this.meetingService.getTypes().subscribe({
      next: response => this.meetingTypes = response,
      error: error => console.log(error)
    })
  }

  getStatus(){
    this.meetingService.getStatuses().subscribe({
      next: response => this.statuses = response,
      error: error => console.log(error)
    })
  }

  getMeeting(){
    this.meetingService.getMeeting(this.meetingTypeId).subscribe({
      next: response => this.meetingResponse = response,
      error: error => console.log(error)
    })
  }

  getSeletedValue(event: any){
    this.meetingTypeId = event.source.value;
    this.getMeeting();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.meetingResponse.meetingItems.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.meetingResponse.meetingItems);
  }

  onStatusSelected(event: any, meetingItemId: number) {
    this.updateMeetingRequest.meetingItemId = meetingItemId;
    this.updateMeetingRequest.statusId = event.target.value

    this.meetingService.updateMeetingStatus(this.updateMeetingRequest).subscribe({
      next: response => this.meetingItemStatusUpdated = response,
      error: error => console.log(error)
    })

  }

  captureNewMeeting() {

    let carryOverItems: MeetingItem[] = [];
    
    this.createMeetingRequest.name = this.meetingResponse.meetingType.name.charAt(0) + (this.meetingResponse.id += 1);
    this.createMeetingRequest.meetingTypeId = this.meetingResponse.meetingType.id;

    for (let item of this.selection.selected) {
      carryOverItems.push(item);
    }

    this.createMeetingRequest.meetingItems = carryOverItems;
    
    this.meetingService.createNewMeeing(this.createMeetingRequest).subscribe({
      next: response => this.meetingResponse = response,
      error: error => console.log(error)
    })

    this.newMeetingCreated = true

  }
}


