import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CurrencyComponent } from './currency/currency.component';
import { AppComponent } from './app.component';

const routes:Routes = [
  { path:'',redirectTo:"/dashboard",pathMatch:"full"},
  { path:'dashboard',component:DashboardComponent},
  { path:'login',component:LoginComponent},
  { path:'home',component:HomepageComponent},
  { path:'currency/:id',component:CurrencyComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
