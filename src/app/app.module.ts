import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule,
        HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }