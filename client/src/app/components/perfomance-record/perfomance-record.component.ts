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
    this.record.userFeedback = this.record.userFeedback || "";
  }

  canEdit(): Boolean {
    return this.authService.getUserRole() !== Role.User;
  }

  canApprove(): Boolean{
    return this.authService.getUserRole() == Role.CEO;
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getSales() {

    let res = this.salesService.getAllSalesByYearAndID({ id: this.record.employeeId
      , year: this.record.year })
      .subscribe(data => {

        if (Array.isArray(data)) {
          this.record.sales = data[0].sales;
          this.calcTotalSaleBonus();
          this.openSnackBar("Updated Record", "Ok")
        } else {
          this.openSnackBar("No mathcing Sales found in openCRX", "Ok")
        }
    },
      (err) => this.openSnackBar("Error", err),
        () => { })

  }

  saveRecordToDB() {

    let id = this.authService.getUserID();
    this.record.readBy = [id]
    this.calcTotalBonus();
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

  isEditable() : Boolean {
    return !this.record.status.startsWith('confirmed') && this.canEdit();
  }

  canConfirm() : Boolean {
    return this.record.status.startsWith('approved') && this.authService.getUserRole() == Role.User;
  }

  confirm() {
    this.record.status = "confirmed: " + this.authService.getUserName() + ", " + new Date().toUTCString();
    this.saveRecordToDB();
  }
  decline() {
    this.record.status = "declined: " + this.authService.getUserName() + ", " + new Date().toUTCString();
    this.saveRecordToDB();
  }

   submitOrApprove() {
    if (this.canApprove()) this.publishToOrangeHRM()
    else {
      this.record.status = "submitted: " + this.authService.getUserName() + ", " + new Date().toUTCString();
      this.saveRecordToDB();
    }
  }


  publishToOrangeHRM() {
    //console.log(this.record)
    this.record.status = "approved: "+ this.authService.getUserName() + ", " + new Date().toUTCString();
    this.calcTotalBonus();
    this.erService.publishEvaluationRecord(this.record._id, this.record)
    .subscribe(data => {
      //console.log(data)
    },
      (err) => this.openSnackBar("Error", err),
      () => { this.openSnackBar("published BonusSalary to OrangeHRM", "Ok") })
  }

  calcTotalBonus() {
    this.record.totalBonus = (this.record.totalBonusA || 0) + (this.record.totalBonusB || 0);
  }

  calcTotalSaleBonus() {
    this.record.sales.forEach(sale =>
      sale['bonus'] = this.calcSaleBonus(sale)
    );
    this.record.totalBonusA = this.record.sales.reduce((total, sale) => total + sale.bonus, 0);
    this.calcTotalBonus();
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
    this.calcTotalBonus();
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
