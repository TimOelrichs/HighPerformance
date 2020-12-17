import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesManListComponent } from './sales-man-list/sales-man-list.component'


const routes: Routes = [
  { path: '', component: SalesManListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
