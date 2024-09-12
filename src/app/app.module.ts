import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogincomponentComponent } from './Login/logincomponent/logincomponent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- Import this
import { HttpClientModule } from '@angular/common/http';
import { LeadsComponent } from './Leads/leads/leads.component';
@NgModule({
  declarations: [
    AppComponent,
    LogincomponentComponent,
    LeadsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  // <-- Add this to imports
    HttpClientModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
