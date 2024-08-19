import { Component, OnInit } from '@angular/core';
import { MeetingType } from 'src/app/shared/models/MeetingType';
import { MeetingServiceService } from '../meeting-service.service';
import { MeetingItem } from 'src/app/shared/models/MeetingItem';
import { SelectionModel } from '@angular/cdk/collections';
import { CreateMeetingRequest } from 'src/app/shared/models/CreateMeetingRequest';
import { MeetingResponse } from 'src/app/shared/models/MeetingResponse';
import { MeetingItemHistory } from 'src/app/shared/models/MeetingItemHistory';


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

  MeetingResponse: MeetingResponse = {
    name: '',
    meetingType: '',
    meetingItems: []
  }

  meetingTypes: MeetingType[] = [];
  meetingItems: MeetingItem[] = [];
  meetingItemHistory: MeetingItemHistory[] = []
  meetingTypeId: number = 0;
 
  meetingType: string = '';
  meeting: string = '';
  meetingDate: string = '';


  displayedColumns: string[] = ['select', 'Meeting Item', 'Comment', 'Status', 'Action By'];
  selection = new SelectionModel<MeetingItem>(true, []);


  constructor(private meetingService: MeetingServiceService) { }
  

  ngOnInit(): void {
    this.getMeetingType();
  }

  getMeetingType(){
    this.meetingService.getTypes().subscribe({
      next: response => this.meetingTypes = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  getMeetingItems(){
    this.meetingService.getMeetingItems(this.meetingTypeId).subscribe({
      next: response => this.meetingItems = response,
      error: error => console.log(error)
    })
  }

  getSeletedValue(event: any){
    this.meetingTypeId = event.source.value;
    this.getMeetingItems();

    this.meetingType = this.meetingItems[0].meeting.meetingType.name;
    this.meeting = this.meetingItems[0].meeting.name;
    this.meetingDate = this.meetingItems[0].meeting.createdOn

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.meetingItems.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.meetingItems);
  }

  captureNewMeeting() {

    let carryOverItems: MeetingItem[] = [];

    this.createMeetingRequest.name = this.meetingItems[0].meeting.meetingType.name.charAt(0) + (this.meetingItems[0].meeting.id += 1);
    this.createMeetingRequest.meetingTypeId = this.meetingTypeId;

    for (let item of this.selection.selected) {
      carryOverItems.push(item);
    }

    this.createMeetingRequest.meetingItems = carryOverItems;
    
    this.meetingService.createNewMeeing(this.createMeetingRequest).subscribe({
      next: response => this.MeetingResponse = response,
      error: error => console.log(error)
    })

  }
}


