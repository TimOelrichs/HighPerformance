import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { EvaluationRecordService } from '../../services/evaluation-record.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public er;
  public loadingER = true;
  public myData = [
    [2018, 5,4],
    [2019, 5,16],
  ];
  public SalesByYear = {
    type: ChartType.BarChart,
    columns: ["Year", "HooverGo", "HooverClean"],
    data: this.myData,
    options: {
      colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      is3D: true
    }
  };

  public type = ChartType.BarChart;

  constructor(private erService: EvaluationRecordService,) { }

  ngOnInit(): void {
    this.getEvaluationRecords();
  }

  getEvaluationRecords(): void {
    this.erService.getAllEvaluationRecords()
      .subscribe(data => {
        this.er = data || [];
      },
        (err) => console.log(err),
        () => { this.loadingER = false; console.log("EvaluationRecord loading Done") })
  }

  createChartData() {
    let dataObj = {}
    this.er.forEach(er => {
      dataObj[er.year] = dataObj[er.year] || [];
      dataObj[er.year][0] = er.sales.filter(s => s.productName == "HooverClean").reducs()
    });

   //TODO
  }


}
