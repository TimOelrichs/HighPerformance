import { Salesman } from "./salesman";

export interface Record {
  _id : String,
  year: Number | any,
  salesman: Salesman,
  sales: Array<Sale>,
  status: String,
  totalBonusA: Number | any,
  socialPerformances: Array<any>,
  totalBonusB?: Number | any,
  totalBonus?: Number | any,
  remarks?: String,
}


export interface Sale{
  _id: String,
  productName: String,
  clientName: String,
  clientRating: String,
  items: Number | any,
  bonus?: Number | any,
  remarks?: String
}

export interface SocialRating{
  _id?: String,
  goalDescription?: String,
  targetValue?: Number | any,
  actualValue?: Number | any,
  bonus?: Number | any,
  remarks?: String
}


