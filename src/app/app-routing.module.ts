import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { AuthGuard } from './_guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'regitrationConfirm', component: ConfirmAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
