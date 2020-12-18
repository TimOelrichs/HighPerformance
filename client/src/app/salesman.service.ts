import { Injectable } from '@angular/core';
import { Salesman } from './salesman';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SalesmanService {

  private salesmanUrl = 'http://localhost:8080/salesman'

  constructor(private http: HttpClient) { }

  getAllSalesmen() {
    return this.http.get(this.salesmanUrl)
  }

  getSalesmenById(id) {
    return this.http.get(`${this.salesmanUrl}/${id}`)
  }

}
