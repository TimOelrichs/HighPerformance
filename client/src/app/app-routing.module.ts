import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesManListComponent } from './sales-man-list/sales-man-list.component'
import { PerformaceViewComponent} from './performace-view/performace-view.component'


const routes: Routes = [
  { path: '', component: SalesManListComponent },
  {
      path: 'performance/:id',
      component:  PerformaceViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
