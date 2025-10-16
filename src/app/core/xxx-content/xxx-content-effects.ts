import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { XxxContentActions } from './xxx-content-actions';
import { XxxContentApi } from './xxx-content-types';
import { XxxContentData } from './xxx-content-data';
import * as XxxContentSelectors from './xxx-content-selectors';

@Injectable()
export class XxxContentEffects {
  private actions$: Actions = inject(Actions);
  private contentData: XxxContentData = inject(XxxContentData);
  private store: Store = inject(Store);

  getContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxContentActions.getContent),
      switchMap((action: { key: string }) =>
        this.contentData.getContent(action.key).pipe(
          map((response: XxxContentApi) => XxxContentActions.getContentSuccess({ content: response })),
          catchError(() => of(XxxContentActions.getContentError({ key: action.key })))
        )
      )
    ));

  showContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxContentActions.showContent),
      concatLatestFrom((action: {
        key: string
      }) => this.store.select(XxxContentSelectors.selectIsContentLoaded(action.key))),
      filter(([_action, isLoaded]) => !isLoaded),
      map(([arg1, _arg2]) => arg1),
      map((action: { key: string }) => XxxContentActions.getContent({ key: action.key }))
    ));
}
