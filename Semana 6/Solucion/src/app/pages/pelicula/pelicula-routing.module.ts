import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeliculaPage } from './pelicula.page';

const routes: Routes = [
  {
    path: '',
    component: PeliculaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeliculaPageRoutingModule {}
