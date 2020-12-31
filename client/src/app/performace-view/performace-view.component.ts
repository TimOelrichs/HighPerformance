import { Component, OnInit } from '@angular/core';
import { EvaluationRecordService } from '../evaluation-record.service';
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
  public er;

  public loadingSaleman = true;
  loadingER = true;

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
        () => { this.loadingSaleman = false; console.log("Load Salesman Done") })

  }

  getEvaluationRecords(): void {
    this.erService.getEvaluationRecords(this.smId)
      .subscribe(data => {
        this.er = data;
      },
        (err) => console.log(err),
        () => { this.loadingER = false; console.log("EvaluationRecord loading Done") })
  }

}
