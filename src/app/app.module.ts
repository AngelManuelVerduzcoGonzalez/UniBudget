import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroModalComponent } from './register-modal/register-modal.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http'; // Nueva forma recomendada
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, RegistroModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, NgChartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
