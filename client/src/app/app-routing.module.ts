import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesManListComponent } from './components/sales-man-list/sales-man-list.component';
import { PerformaceViewComponent} from './components/performace-view/performace-view.component';
import { LoginComponent} from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { Role } from './models/role';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: SalesManListComponent, canActivate: [AuthGuard], data:{roles: [Role.CEO, Role.HR, Role.Admin]} },
  { path: 'performance/:id', component:  PerformaceViewComponent, canActivate: [AuthGuard] },
  { path: '**',   redirectTo: '',  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
