import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'presupuestos',
    loadChildren: () => import('./presupuestos/presupuestos.module').then(m => m.PresupuestosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'analisis',
    loadChildren: () => import('./analisis/analisis.module').then(m => m.AnalisisPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'idioma',
    loadChildren: () => import('./idioma/idioma.module').then(m => m.IdiomaPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
