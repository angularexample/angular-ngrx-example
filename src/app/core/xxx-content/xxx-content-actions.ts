import { createActionGroup, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { XxxContentApi, xxxContentFeatureName } from './xxx-content-types';

export const XxxContentActions = createActionGroup({
  source: xxxContentFeatureName,
  events: {
    'getContent': props<{ key: string }>(),
    'getContentError': props<{ key: string, err: HttpErrorResponse }>(),
    'getContentSuccess': props<{ content: XxxContentApi }>(),
    'showContent': props<{ key: string }>(),
  },
});
