import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {CalendarModule} from "primeng/calendar";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
