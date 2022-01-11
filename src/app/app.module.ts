import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationModule } from './Authentication/authentication.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AuthGuard } from './Authentication/auth.guard';



const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component:RegisterComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,  
    AuthenticationModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [
    AuthGuard
   /*  {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true} */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
