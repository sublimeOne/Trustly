import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'add', loadChildren: () => import('./add/add.module').then(m => m.AddPageModule) },
  { path: 'delete', loadChildren: () => import('./delete/delete.module').then(m => m.DeletePageModule) },
  { path: 'edit/:id', loadChildren: () => import('./edit/edit.module').then(m => m.EditPageModule) },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
