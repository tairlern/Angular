import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: '', redirectTo: '', pathMatch: 'full' },
   { path: '', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
   { path: '', loadChildren: () => import('./user/user-routing.module').then(c => c.UserRoutingModule) },
   { path: '', loadChildren: () => import('./recipe/recipe-routing.module').then(c => c.RecipeRoutingModule) },

];
