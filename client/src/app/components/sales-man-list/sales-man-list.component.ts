import { Component, OnInit } from '@angular/core';
import { Salesman } from '../../models/salesman'
import { SalesmanService } from '../../services/salesman.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-sales-man-list',
  templateUrl: './sales-man-list.component.html',
  styleUrls: ['./sales-man-list.component.css']
})
export class SalesManListComponent implements OnInit {

  loading: boolean = true;
  public salesmen;

  constructor(private salesmanService: SalesmanService) { }

  ngOnInit(): void {
    this.getSalesman();
  }

  getSalesman(): void {
    this.salesmanService.getAllSalesmen()
      .subscribe(data => { this.salesmen = data; this.loading = false; console.log(data) },
        (err) => console.log(err),
        () => console.log("Done"))

  }

}
