import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { Route } from '@angular/router';
import { XxxUser } from './xxx-user';
import { XxxUserEffects } from './xxx-user-effects';
import { xxxUserFeatureName } from './xxx-user-types';
import { xxxUserReducer } from './xxx-user-reducer';

export const xxxUserRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideEffects(XxxUserEffects),
      provideState(xxxUserFeatureName, xxxUserReducer)
    ],
    children: [
      {
        path: '',
        component: XxxUser
      }
    ]
  }
];
