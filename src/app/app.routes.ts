import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { SearchMatchComponent } from './features/search-match/search-match.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    //Routes with navbar and footer 
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        { path: 'search-match', component: SearchMatchComponent, canActivate:[authGuard]}
      ]
    }
  ];