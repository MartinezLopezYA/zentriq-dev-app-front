import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HSStaticMethods } from 'preline/dist';

bootstrapApplication(App, appConfig)
  .then(() => {
    HSStaticMethods.autoInit();
  })
  .catch((err) => console.error(err));
