import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { SearchMatchComponent } from './features/search-match/search-match/search-match.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'search-match', component: SearchMatchComponent}
];
