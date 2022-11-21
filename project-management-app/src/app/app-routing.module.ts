import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  { path: 'team', loadChildren: ()=> import('./core/core.module').then(m => m.CoreModule)},
  { path: 'redirect', redirectTo: '/main', pathMatch: 'full' },

  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  { path: 'boards', loadChildren: () => import('./board/board.module').then((m) => m.BoardModule) },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules,
    },
  )],
  exports: [RouterModule],
})
export class AppRoutingModule { }
