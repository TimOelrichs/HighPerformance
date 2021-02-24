import { Component, OnInit, Input } from '@angular/core';
import { EvaluationRecordService } from '../../services/evaluation-record.service';
import { SalesmanService } from '../../services/salesman.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public er;
  private salesmen;
  public loadingER = true;
  public loadingSM = true;
  public socialPerfomance;
  public socialAverageData = [];

  constructor(private erService: EvaluationRecordService,
    private salesmanService: SalesmanService) { }

  ngOnInit(): void {
    this.getEvaluationRecords();
    this.getSalesmen();
  }

  getEvaluationRecords(): void {
    this.erService.getAllEvaluationRecords()
      .subscribe(data => {
        this.er = data || [];
      },
        (err) => console.log(err),
        () => {

          console.log("EvaluationRecord loading Done");
          this.aggregateSocialPerformance(null);
          this.loadingER = false;
        })
  }
  getSalesmen(): void {
    this.salesmanService.getAllSalesmen()
      .subscribe(data => {
        this.salesmen = data || [];
      }, (err) => console.log(err),
        () => {
          console.log("Salesman loading Done");
          this.loadingSM = false;

        })
  }
  aggregateSocialPerformance(year) {
    var data = year ? this.er.filter(record => record.year == year) : this.er;
    let allSocialPerformance = {};
    if (!data.length) return
    data.forEach(record => {
      console.log(record)
      record.socialPerformances.forEach(sp => {
        if (!allSocialPerformance[sp.goalDescription]) allSocialPerformance[sp.goalDescription] = { goalDescription: sp.goalDescription, targetValue: 0, actualValue: 0, count: 0, bonus: 0 }
        allSocialPerformance[sp.goalDescription].targetValue += sp.targetValue;
        allSocialPerformance[sp.goalDescription].actualValue += sp.actualValue;
        allSocialPerformance[sp.goalDescription].bonus += sp.bonus;
        allSocialPerformance[sp.goalDescription].count++;
      });
    });
    console.log("allSocialPerformance")
    console.log(allSocialPerformance)
    data = Object.values(allSocialPerformance)
    data = data.map((e) => {
      return {
        goalDescription: e.goalDescription,
        targetValue: (e.targetValue / e.count),
        actualValue: (e.actualValue / e.count),
        totalBonusB: (e.bonus / e.count),
        remarks: ""
      }
    })
    console.log(data)
    this.socialAverageData = data;
  }

  getTopSalesman() {
    return this.er.map(record => {
      return {
        fullName: this.salesmen.filter(s => s.employeeId == record.employeeId)[0].fullName,
        year: record.year,
        totalBonus: record.totalBonus
      }
    }).sort((a, b) => b.totalBonus - a.totalBonus)
  }

  getSales(year) {
    var data = year ? this.er.filter(record => record.year == year) : this.er;
    if (!data.length) return
    let salesObj = { HooverClean: 0, HooverGo: 0 }
    data.forEach(record => {
      record.sales.forEach(sale => {
        salesObj[sale.productName] += sale.items;
      })
    })
    return salesObj;
  }
}
