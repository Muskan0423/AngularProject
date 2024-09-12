import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincomponentComponent } from './Login/logincomponent/logincomponent.component';
import { LeadsComponent } from './Leads/leads/leads.component';

const routes: Routes = [
  { path: 'login', component: LogincomponentComponent },
  { path: 'leads', component: LeadsComponent }, // Add your LeadsComponent route
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
