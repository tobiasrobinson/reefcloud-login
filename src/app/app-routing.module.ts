import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/routes').then((r) => r.AUTH_ROUTES),
    loadComponent: () =>
      import('./auth/layout/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
