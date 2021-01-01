import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluationRecordService {

  private erUrl = 'http://localhost:8080/evaluationrecord/'

  constructor(private http: HttpClient) { }

  getEvaluationRecords(id) {
    return this.http.get(this.erUrl+id)
  }

  createEvaluationRecord(record) {
    return this.http.post(this.erUrl, record);
  }

  updateEvaluationRecord(id, record) {
    return this.http.put(this.erUrl + id, record);
  }

  publishEvaluationRecord(id, record) {
    return this.http.post(this.erUrl + "publish/" + id, record);
  };


}
