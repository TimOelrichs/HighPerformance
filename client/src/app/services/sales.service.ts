import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private salesUrl = 'http://localhost:8080/sales'

  constructor(private http: HttpClient) { }

  getAllSalesByYearAndID( params) {
    console.log(params.id, params.year)
    let url = this.salesUrl;
    switch (true) {
      case params.id && params.year:
        url = url + `?year=${params.year}&&id=${params.id}`
        break;
      case params.id:
        url = url + `?id=${params.id}`
        break;
      case params.year:
        url = url + `?year=${params.year}`
        break;
    }

    return this.http.get(url + `?year=${params.year}&&id=${params.id}`);
    //return this.http.get(url + `?year=${params.year}`);
  }

}
