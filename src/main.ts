import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { registerLocaleData } from '@angular/common';
// import localeEs from "@angular/common/locales/es"




// registerLocaleData(localeEs);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


if (environment.production) {
  enableProdMode();
}

