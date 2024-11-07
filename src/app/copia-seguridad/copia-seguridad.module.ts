import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CopiaSeguridadPageRoutingModule } from './copia-seguridad-routing.module';

import { CopiaSeguridadPage } from './copia-seguridad.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopiaSeguridadPageRoutingModule,
    TranslateModule
  ],
  declarations: [CopiaSeguridadPage]
})
export class CopiaSeguridadPageModule {}
