import { Component, OnInit } from '@angular/core';
import { MeetingType } from 'src/app/shared/models/MeetingType';
import { MeetingServiceService } from '../meeting-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  meetingTypes: MeetingType[] = [];

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

}


