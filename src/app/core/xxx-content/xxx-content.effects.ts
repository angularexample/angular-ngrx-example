import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { XxxContentActions } from './xxx-content.actions';
import { XxxContentData } from './xxx-content-data';
import * as XxxContentSelectors from './xxx-content.selectors';
import { XxxContentApi } from './xxx-content-types';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class XxxContentEffects {
  private actions$: Actions = inject(Actions);
  private contentService: XxxContentData = inject(XxxContentData);
  private store: Store = inject(Store);

  showContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxContentActions.showContent),
      concatLatestFrom((action: {
        key: string
      }) => this.store.select(XxxContentSelectors.selectIsContentLoaded(action.key))),
      filter(([_action, isLoaded]) => !isLoaded),
      map(([arg1, _arg2]) => arg1),
      map((action: { key: string }) => XxxContentActions.getContent({key: action.key}))
    ));

  getContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxContentActions.getContent),
      switchMap((action: { key: string }) =>
        this.contentService.getContent(action.key).pipe(
          map((response: XxxContentApi) => XxxContentActions.getContentSuccess({content: response})),
          catchError((err: HttpErrorResponse) => of(XxxContentActions.getContentError({key: action.key, err})))
        )
      )
    ));
}
