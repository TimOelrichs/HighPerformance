export interface Record {
  _id : String,
  year: Number,
  salesman: Object,
  sales: Sales,
  status: String,
  totalBonusA: Number | any,
  socialPerfomances: Array<any>,
  totalBonusB?: Number | any,
  totalBonus?: Number | any,

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
  skill?: String,
  target?: Number | any,
  actual?: Number | any,
  bonus?: Number | any,
  remarks?: String
}
