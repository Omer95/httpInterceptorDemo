import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { LoginGuard } from './login.guard';
import { DashGuard } from './dash.guard';

const routes: Routes = [
  { path:'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [DashGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
