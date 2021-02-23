import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-useraccount-view',
  templateUrl: './useraccount-view.component.html',
  styleUrls: ['./useraccount-view.component.css']
})
export class UseraccountViewComponent implements OnInit {

  public oldPassword;
  public newPassword;
  public repeatPassword;

  constructor() { }

  ngOnInit(): void {
  }

  submitPassword() {

  }

}
