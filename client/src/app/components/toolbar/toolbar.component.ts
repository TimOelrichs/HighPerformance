import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  isLogedIn(): Boolean {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logOut().then(() => this.route.navigate(['/login']));
  }

  getUserName() {
    return this.authService.getUserName();
  }

}
