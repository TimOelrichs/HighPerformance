import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfomance-record',
  templateUrl: './perfomance-record.component.html',
  styleUrls: ['./perfomance-record.component.css']
})
export class PerfomanceRecordComponent implements OnInit {

  @Input() record;
  constructor() { }

  ngOnInit(): void {
  }

}
