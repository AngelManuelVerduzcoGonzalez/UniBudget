import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopiaSeguridadPage } from './copia-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: CopiaSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopiaSeguridadPageRoutingModule {}
