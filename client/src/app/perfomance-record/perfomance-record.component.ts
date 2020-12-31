import { Component, Input, OnInit } from '@angular/core';
import {Record, Sale, Sales, SocialRating} from '../../models/model'


@Component({
  selector: 'app-perfomance-record',
  templateUrl: './perfomance-record.component.html',
  styleUrls: ['./perfomance-record.component.css']
})

export class PerfomanceRecordComponent implements OnInit {

  @Input() record: Record;
  constructor() { }

  ngOnInit(): void {
    this.calcTotalSaleBonus();
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
    this.record.socialPerfomances = this.calcTotalSocialBonus(ratings);
    this.record.totalBonusB = this.record.socialPerfomances.map(r => r.bonus).reduce((acc, value) => acc + value, 0);
    console.log(this.record.socialPerfomances);
  }

  calcTotalSocialBonus(ratings) {
    for (let rating of ratings) {
      rating.bonus = this.calcSocialBonus(rating);
    }

    return ratings;
  }



  calcSocialBonus(record) {
    if (record.target && record.actual) {
      if (record.actual == record.target) return 50;
      if (record.actual > record.target) return 100;
      if (record.target-record.actual == 1) return 20;
      return 0;
    }
  }

}
