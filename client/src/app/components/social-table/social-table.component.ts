import { Component, OnInit, Input } from '@angular/core';
import { SocialRating } from '../../models/model';


@Component({
  selector: 'app-social-table',
  templateUrl: './social-table.component.html',
  styleUrls: ['./social-table.component.css']
})
export class SocialTableComponent implements OnInit {


  displayedColumns = ['description', 'target', "actual", "bonus", "remarks"];

  @Input() socialPerformances: SocialRating[]


  getTotalCost() {
    //return this.ratings.map(t => t.items).reduce((acc, value) => acc + value, 0);
  }

  getTotalBonus() {
    return this.socialPerformances.map(t => t.bonus).reduce((acc, value) => acc + value, 0);
  }

  getAverage(prop) {
    let sum = this.socialPerformances.map(t => t[prop]).reduce((acc, value) => acc + Number(value), 0)
    let average = sum / this.socialPerformances.length;
    return average.toFixed(1);
  }

  constructor() { }

  ngOnInit(): void {
  }


}


