import { Component, OnInit, Input } from '@angular/core';


export interface SocialPerformances {
  _id : String,
  skill: String,
  target: Number,
  actual: Number,
  bonus?: Number,
  remarks?: String
}

@Component({
  selector: 'app-social-table',
  templateUrl: './social-table.component.html',
  styleUrls: ['./social-table.component.css']
})
export class SocialTableComponent implements OnInit {


  displayedColumns = ['skill', 'target', "actual", "bonus", "remarks"];

  @Input() socialPerfomances: SocialPerformances[]


  getTotalCost() {
    //return this.ratings.map(t => t.items).reduce((acc, value) => acc + value, 0);
  }

  constructor() { }

  ngOnInit(): void {
  }


}


