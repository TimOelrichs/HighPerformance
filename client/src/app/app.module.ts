import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesManListComponent } from './components/sales-man-list/sales-man-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { MaterialModule } from './material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { PerformaceViewComponent } from './components/performace-view/performace-view.component';
import { PerfomanceRecordComponent } from './components/perfomance-record/perfomance-record.component';
import { SalesTableComponent } from './components/sales-table/sales-table.component';
import { SocialTableComponent } from './components/social-table/social-table.component';
import { DialogEditSocialComponent, DialogEditSocialContent } from './components/dialog-edit-social/dialog-edit-social.component';
import { FormsModule } from '@angular/forms';
import { DialogAddRecordComponent,DialogAddRecordContent } from './components/dialog-add-record/dialog-add-record.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesManListComponent,
    ToolbarComponent,
    PerformaceViewComponent,
    PerfomanceRecordComponent,
    SalesTableComponent,
    SocialTableComponent,
    DialogEditSocialComponent,
    DialogEditSocialContent,
    DialogAddRecordComponent,
    DialogAddRecordContent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  entryComponents: [
    DialogEditSocialComponent,
    DialogEditSocialContent,
    DialogAddRecordContent,
    DialogAddRecordComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
