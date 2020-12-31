export interface Record {
  _id : String,
  year: Number,
  salesman: Object,
  sales: Sales,
  status: String,
  totalBonusA: Number | any,
  socialPerformances: Array<any>,
  totalBonusB?: Number | any,
  totalBonus?: Number | any,
  remarks?: String,
}


export interface Sales {
  _id: String,
  HooverClean?: Array<Sale>,
  HooverGo?: Array<Sale>
}

export interface Sale{
  _id: String,
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
