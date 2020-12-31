import { Component, Input, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Record, Sale, Sales, SocialRating} from '../../models/model'
import { EvaluationRecordService } from '../evaluation-record.service';

@Component({
  selector: 'app-perfomance-record',
  templateUrl: './perfomance-record.component.html',
  styleUrls: ['./perfomance-record.component.css']
})

export class PerfomanceRecordComponent implements OnInit {

  @Input() record: Record;
  constructor(
    private _snackBar: MatSnackBar,
    private erService: EvaluationRecordService) { }

  ngOnInit(): void {
    this.calcTotalSaleBonus();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  updateRecordToDB() {
    console.log(this.record)
    this.record.totalBonus = this.record.totalBonusA + this.record.totalBonusB;
    this.erService.updateEvaluationRecord(this.record._id, this.record)
    .subscribe(data => {
      console.log(data)
    },
      (err) => console.log(err),
      () => { this.openSnackBar("Save to Db", "Ok") })
}

  publishToOrangeHRM() {
    console.log(this.record)
    this.record.status = "published: " + new Date().toUTCString();
    this.record.totalBonus = this.record.totalBonusA + this.record.totalBonusB;
    this.erService.publishEvaluationRecord(this.record._id, this.record)
    .subscribe(data => {
      console.log(data)
    },
      (err) => console.log(err),
      () => { this.openSnackBar("published BonusSalay to OrangeHRM", "Ok") })
  }


  calcTotalSaleBonus() {

    let sumHooverClean = 0;
    let sumHooverGo = 0;
    if (this.record.sales["HooverClean"]) {
      for (let sale of this.record.sales["HooverClean"]) {
        sale['bonus'] = this.calcSaleBonus("HooverClean", sale);
        console.log(sale);
        sumHooverClean += sale.bonus;
      }
    }
    if (this.record.sales["HooverGo"]) {
      for (let sale of this.record.sales["HooverGo"]) {
        sale.bonus = this.calcSaleBonus("HooverGo", sale);
        console.log(sale);
        sumHooverGo += sale.bonus;
      }
    }
    this.record.totalBonusA = sumHooverClean + sumHooverGo;
    console.log(this.record.totalBonusA);

  }



  calcSaleBonus(product: String, sale: Sale): Number {
    switch (product) {
      case "HooverClean":
        switch (sale.clientRating) {
          case "execellent":
            return 250 * sale.items / 10 * 1.4;
          case "very good":
            return 250 * sale.items / 10 * 1.2;
          default:
              return 250 * sale.items / 10;
        }
        case "HooverGo":
          case "execellent":
            return 200 * sale.items / 10 * 1.4;
          case "very good":
            return 200 * sale.items / 10 * 1.2;
          default:
              return 200 * sale.items / 10;
    }
  }


  updateSocialRating(ratings: any[]) {
    this.record.status = "edited: " + new Date().toUTCString();
    this.record.socialPerformances = this.calcTotalSocialBonus(ratings);
    this.record.totalBonusB = this.record.socialPerformances.map(r => r.bonus).reduce((acc, value) => acc + value, 0);
    console.log(this.record.socialPerformances);
  }

  calcTotalSocialBonus(ratings) {
    for (let rating of ratings) {
      rating.bonus = this.calcSocialBonus(rating);
    }

    return ratings;
  }



  calcSocialBonus(record) {
    if (record.targetValue && record.actualValue) {
      if (record.actualValue == record.targetValue) return 50;
      if (record.actualValue > record.targetValue) return 100;
      if (record.targetValue-record.actualValue == 1) return 20;
      return 0;
    }
  }

}
