import { Component, OnInit } from '@angular/core';
import { EvaluationRecordService } from '../evaluation-record.service'
import { SalesmanService } from '../salesman.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-performace-view',
  templateUrl: './performace-view.component.html',
  styleUrls: ['./performace-view.component.css']
})
export class PerformaceViewComponent implements OnInit {

  private smId;
  public salesman;
  private sales;
  private er;

  public loading = true;

  constructor(
    private erService: EvaluationRecordService,
    private salesmanService: SalesmanService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //get router params
    this.route.params.subscribe(params => {
      console.log(params)
      this.smId = params['id'];
    })

    this.getSalesman();
    this.getEvaluationRecords();
  }

  getSalesman(): void {
    this.salesmanService.getSalesmenById(this.smId)
      .subscribe(data => { this.salesman = data; console.log(data) },
        (err) => console.log(err),
        () => console.log("Load Salesman Done"))

  }

  getEvaluationRecords(): void {
    this.erService.getEvaluationRecords(this.smId)
      .subscribe(data => {
        this.er = data;
        this.salesman = data['salesman'];
        this.sales = data['sales'];
        console.log(data);
        console.log(this.salesman);
      },
        (err) => console.log(err),
        () => { this.loading = false; console.log("Done") })
  }

}