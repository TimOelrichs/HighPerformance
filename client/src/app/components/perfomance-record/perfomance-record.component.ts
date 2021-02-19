import { Component, Input, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Record, Sale, SocialRating} from '../../models/model'
import { EvaluationRecordService } from '../../services/evaluation-record.service';
import { SalesService } from '../../services/sales.service';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-perfomance-record',
  templateUrl: './perfomance-record.component.html',
  styleUrls: ['./perfomance-record.component.css']
})

export class PerfomanceRecordComponent implements OnInit {

  @Input() record: Record;
  constructor(
    private _snackBar: MatSnackBar,
    private erService: EvaluationRecordService,
    private authService : AuthService,
    private salesService: SalesService) { }

  ngOnInit(): void {
    if (this.record.sales) this.calcTotalSaleBonus();
    if (this.record.socialPerformances) this.calcTotalSocialBonus(null);
  }

  canEdit(): Boolean {
    return this.authService.getUserRole() !== Role.User;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getSales() {
    console.log(this.record.salesman.openCRXId)
    let res = this.salesService.getAllSalesByYearAndID({ id: this.record.salesman.openCRXId, year: this.record.year })
      .subscribe(data => {
        console.log(data);
        if (Array.isArray(data)) {
          this.record.sales = data[0].sales;
          this.calcTotalSaleBonus();
          console.log(this.record);
          this.openSnackBar("Updated Record", "Ok")
        } else {
          this.openSnackBar("No mathcing Sales found in openCRX", "Ok")
        }
    },
      (err) => this.openSnackBar("Error", err),
        () => { })

  }

  saveRecordToDB() {
    console.log(this.record)
    this.record.totalBonus = this.record.totalBonusA || 0 + this.record.totalBonusB || 0;
    if (this.record._id) {
      this.erService.updateEvaluationRecord(this.record._id, this.record)
        .subscribe(data => {
          //console.log(data)
        },
          (err) => this.openSnackBar("Error", err),
          () => { this.openSnackBar("Save to Db", "Ok") })
    }
    else {
      this.erService.createEvaluationRecord(this.record)
        .subscribe(data  => {
          this.record._id = data["_id"];
      },  (err) => this.openSnackBar("Error", err),
      () => { this.openSnackBar("Save to Db", "Ok") })
    }
  }

  isEditable() {
    return !this.record.status.startsWith('published') && this.canEdit();
  }

  publishToOrangeHRM() {
    console.log(this.record)
    this.record.status = "published: " + new Date().toUTCString();
    this.record.totalBonus = this.record.totalBonusA || 0 + this.record.totalBonusB || 0;
    this.erService.publishEvaluationRecord(this.record._id, this.record)
    .subscribe(data => {
      console.log(data)
    },
      (err) => this.openSnackBar("Error", err),
      () => { this.openSnackBar("published BonusSalay to OrangeHRM", "Ok") })
  }


  calcTotalSaleBonus() {

    this.record.sales.forEach(sale =>
      sale['bonus'] = this.calcSaleBonus(sale)
    );
    this.record.totalBonusA = this.record.sales.reduce((total, sale) => total + sale.bonus, 0);
      console.log(this.record.totalBonusA)
  }



  calcSaleBonus(sale: Sale): Number {
    switch (sale.productName) {
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
  }

  calcTotalSocialBonus(data) {
    let ratings = data || this.record.socialPerformances;
    for (let rating of ratings) {
      rating.bonus = this.calcSocialBonus(rating);
    }

    return data;
  }



  calcSocialBonus(record) {
    if (record.targetValue && record.actualValue) {
      if (record.actualValue == record.targetValue) return 50;
      if (record.actualValue > record.targetValue) return 100;
      if (record.targetValue-record.actualValue == 1) return 20;
      return 0;
    }
  }

  filterSales(productname) : Array<Sale> {
    return this.record.sales.filter(sale => sale.productName == productname);
  }

}
