import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesManListComponent } from './sales-man-list/sales-man-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component'
import { MaterialModule } from './material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { PerformaceViewComponent } from './performace-view/performace-view.component';
import { PerfomanceRecordComponent } from './perfomance-record/perfomance-record.component';
import { SalesTableComponent } from './sales-table/sales-table.component';
import { SocialTableComponent } from './social-table/social-table.component';
import { DialogEditSocialComponent, DialogEditSocialContent } from './dialog-edit-social/dialog-edit-social.component';
import { FormsModule } from '@angular/forms';
import { DialogAddRecordComponent } from './dialog-add-record/dialog-add-record.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
