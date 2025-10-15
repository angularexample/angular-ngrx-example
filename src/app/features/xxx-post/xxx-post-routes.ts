import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { Route } from '@angular/router';
import { XxxPost } from './xxx-post';
import { XxxPostEdit } from './xxx-post-edit/xxx-post-edit';
import { XxxPostEffects } from './xxx-post.effects';
import { xxxPostFeatureName } from './xxx-post-types';
import { xxxPostReducer } from './xxx-post.reducer';

export const xxxPostRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideEffects(XxxPostEffects),
      provideState(xxxPostFeatureName, xxxPostReducer)
    ],
    children: [
      {
        path: '',
        component: XxxPost,
      },
      {
        path: 'edit',
        component: XxxPostEdit,
      },
    ],
  },
];
