import { Component, OnInit } from '@angular/core';
import { MeetingType } from 'src/app/shared/models/MeetingType';
import { MeetingServiceService } from '../meeting-service.service';
import { MeetingItem } from 'src/app/shared/models/MeetingItem';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  meetingTypes: MeetingType[] = [];
  meetingItems: MeetingItem[] = [];
  meetingTypeId: number = 0;

  meetingType: string = '';
  meeting: string = '';
  meetingDate: string = '';

  checked = false;


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

    this.meetingType = this.meetingItems[0].meetingType;
    this.meeting = this.meetingItems[0].meeting;

  }
}


