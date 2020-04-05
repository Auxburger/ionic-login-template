import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './administration/guards/authentication.guard';
import { NoAuthenticationGuard } from './administration/guards/no-authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./content/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'account',
    canActivate: [NoAuthenticationGuard],
    canActivateChild: [NoAuthenticationGuard],
    children: [{
      path: 'login',
      loadChildren: () => import('./administration/login/login.module').then(m => m.LoginPageModule)
    },
    {
      path: 'register',
      loadChildren: () => import('./administration/register/register.module').then(m => m.RegisterPageModule)
    }]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
