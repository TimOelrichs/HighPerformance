import { Component, OnInit, Input } from '@angular/core';

export interface Transaction {
    _id : String,
    clientName: String,
    clientRating: String,
    items: any,
    bonus?: Number,
    remarks?: String
}

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent implements OnInit {

  displayedColumns = ['clientName', 'clientRating', "items", "bonus", "remarks"];

  @Input() transactions: Transaction[]


  getTotalCost() {
    return this.transactions.map(t => t.items).reduce((acc, value) => acc + value, 0);
  }

  constructor() { }

  ngOnInit(): void {
  }



}
