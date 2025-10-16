import {
  ApplicationConfig,
  importProvidersFrom, isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app-routes';
import { XxxContentEffects } from './core/xxx-content/xxx-content-effects';
import { xxxContentReducer } from './core/xxx-content/xxx-content-reducer';
import { provideHttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// StoreDevtoolsModule is required to use ReduxDevTools Chrome Extension
// and must be in providers after provideStore
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideEffects(XxxContentEffects),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ xxxContent: xxxContentReducer }),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: !isDevMode(), // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        connectInZone: true // If set to true, the connection is established within the Angular zone
      })),
    provideZonelessChangeDetection()
  ]
};
