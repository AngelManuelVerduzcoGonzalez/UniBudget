import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const idiomaGuardado = localStorage.getItem('idioma') || 'en';
    this.translate.setDefaultLang(idiomaGuardado);
    this.translate.use(idiomaGuardado);
  }
}
