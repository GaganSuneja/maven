import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GeneralService } from'./common/general.service';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './highlight.directive';
import { NewhighlightDirective } from './newhighlight.directive';
import { CurrencyComponent } from './currency/currency.component';
import   {  
  MatButtonModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTableModule
  
  }from '@angular/material';
  import {priceFormatPipe} from './common/pipes/priceFormat.pipe'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomepageComponent,
    NewhighlightDirective,
    HighlightDirective,
    CurrencyComponent,
    priceFormatPipe
  ],    
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  providers: [GeneralService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
