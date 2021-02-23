import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EvaluationRecordService } from '../../services/evaluation-record.service';
import { Role } from '../../models/role';
import { Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public er;
  private user;
  constructor(private authService: AuthService,
                      private erService: EvaluationRecordService,
                      private route: Router) { }

  ngOnInit(): void {
  }

  updateMessages() {
    this.erService.getAllEvaluationRecords().subscribe(data => this.er = this.filterMessages(data));
  }

  getMessages() : Array<any> {
    if (!this.er) {
      this.erService.getAllEvaluationRecords().subscribe( data => this.er = this.filterMessages(data));
      return this.er
    }
    return this.er;
  }

  isLogedIn(): Boolean {
    return this.authService.isAuthenticated();

    /*let loggedIn = this.authService.isAuthenticated();
    if(loggedIn) this.updateMessages();
     loggedIn;*/
  }

  logOut() {
    this.er = null;
    this.authService.logOut();
    this.route.navigate(['/login']);
  }

  getUserName() {
    return this.authService.getUserName();
  }

  getUserRole() {
    return this.authService.getUserRole();
  }

  getUserId() {
    return this.authService.getUserID();
  }

  getUser() {
    return this.authService.getUser();
  }

  filterMessages(data): [any] {
    let user = this.getUser();
    if (user.role == Role.User) {
      return data.filter(r => r.employeeId == user.userId && r.status?.startsWith("approved") && !r.readBy?.includes(user.userId))
    }
    if (user.role == Role.CEO) {
      return data.filter(r => (r.status?.startsWith("submitted") || r.status?.startsWith("confirmed") || r.status?.startsWith("declined") ) && !r.readBy?.includes(user.userId) )
    }
    if (user.role == Role.HR) {
      return data.filter(r => (r.status?.startsWith("approved") || r.status.startsWith("confirmed") || r.status?.startsWith("declined") ) && !r.readBy?.includes(user.userId) )
    }
  }


  async markAsRead(record) {
    let user = this.getUser();

    record.readBy = record.readBy || [];
    record.readBy.push(user.userId);
    console.log(user.userId)
    console.log(record.readBy)
    this.erService.updateEvaluationRecord(record._id, record).subscribe(data => this.updateMessages())

  }


}
