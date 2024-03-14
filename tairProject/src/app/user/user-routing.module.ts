import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LogoutComponent } from './component/logout/logout.component';



const USER_ROUTES: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(USER_ROUTES)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
