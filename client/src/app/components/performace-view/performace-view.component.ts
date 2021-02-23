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
  public loadingER = true;

  constructor(
    private erService: EvaluationRecordService,
    private salesmanService: SalesmanService,
    private authService : AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //get router params
    this.er = [];
    this.route.params.subscribe(params => {
      this.smId = params['id'];
    })

    this.getSalesman();
    this.getEvaluationRecords();
  }

  getSalesman(): void {
    this.salesmanService.getSalesmenById(this.smId)
      .subscribe(data => { this.salesman = data;},
        (err) => console.log(err),
        () => { this.loadingSaleman = false;  })

  }

  getEvaluationRecords(): void {
    this.erService.getEvaluationRecords(this.smId)
      .subscribe(data => {
        this.er = data || [];
        this.sortEvaluationRecords();
      },
        (err) => console.log(err),
        () => { this.loadingER = false; })
  }


  addEvaluationRecord(year): void {
    if (!year) return;
    let record = {
      year: year,
      employeeId: this.salesman.employeeId,
      status: "created: " + new Date().toUTCString(),
      sales: [],
      socialPerformances: [],


    }
    //console.log(record)
    this.er.push(record);
    this.sortEvaluationRecords();
  }

  sortEvaluationRecords() {
    this.er.sort((a, b) => Number(b.year) - Number(a.year));
  }

  canEdit(): Boolean {
    let user = this.authService.getUser();
    return user ? this.authService.getUserRole() !== Role.User : false;
  }


}
