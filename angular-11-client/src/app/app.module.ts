import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddApplicationComponent } from './components/add-application/add-application.component';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';
import { ApplicationsListComponent } from './components/application-list/application-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddApplicationComponent,
    ApplicationDetailsComponent,
    ApplicationsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
