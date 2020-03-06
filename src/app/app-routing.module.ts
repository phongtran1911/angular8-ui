import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  // NbLogoutComponent,
  // NbRegisterComponent,
  // NbRequestPasswordComponent,
  // NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './@core/Services/Guard/auth.guard';
import { NgxLoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('app/auth/auth.module')
        .then(m=> m.NgxAuthModule)    
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
