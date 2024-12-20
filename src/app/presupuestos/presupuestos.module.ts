import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresupuestosPageRoutingModule } from './presupuestos-routing.module';

import { PresupuestosPage } from './presupuestos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresupuestosPageRoutingModule,
    TranslateModule
  ],
  declarations: [PresupuestosPage]
})
export class PresupuestosPageModule {}