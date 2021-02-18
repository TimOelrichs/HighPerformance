import { Component, OnInit } from '@angular/core';
import { EvaluationRecordService } from '../../services/evaluation-record.service';
import { SalesmanService } from '../../services/salesman.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Role } from '../../models/role';

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
    private authService : AuthService,
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
        this.sortEvaluationRecords();
      },
        (err) => console.log(err),
        () => { this.loadingER = false; console.log("EvaluationRecord loading Done") })
  }


  addEvaluationRecord(year): void {
    if (!year) return;
    let record = {
      year: year,
      salesman: this.salesman,
      status: "created on" + new Date().toUTCString(),
      socialPerformances: []

    }
    console.log(record)
    this.er.push(record);
    this.sortEvaluationRecords();
  }

  sortEvaluationRecords() {
    this.er.sort((a, b) => Number(b.year) - Number(a.year));
  }

  canEdit(): Boolean {
    return this.authService.getUserRole() !== Role.User;
  }

}
