import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesManListComponent } from './components/sales-man-list/sales-man-list.component';
import { PerformaceViewComponent} from './components/performace-view/performace-view.component';
import { LoginComponent} from './components/login/login.component';
import { AuthGuardService as AuthGuard} from './auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: SalesManListComponent, canActivate: [AuthGuard] },
  { path: 'performance/:id', component:  PerformaceViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
