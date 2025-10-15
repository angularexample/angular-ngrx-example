import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { XxxAlert } from '../../core/xxx-alert/xxx-alert';
import { XxxLoadingService } from '../../core/xxx-loading/xxx-loading-service';
import { XxxUserActions } from './xxx-user.actions';
import { XxxUserApiResponse } from './xxx-user-types';
import { XxxUserData } from './xxx-user-data';
import * as XxxUserSelectors from './xxx-user.selectors';

@Injectable()
export class XxxUserEffects {
  private actions$: Actions = inject(Actions);
  private router: Router = inject(Router);
  private store: Store = inject(Store);
  private alertService: XxxAlert = inject(XxxAlert);
  private loadingService: XxxLoadingService = inject(XxxLoadingService);
  private userDataService: XxxUserData = inject(XxxUserData);

  setSelectedUserId$ = createEffect(() => this.actions$.pipe(
      ofType(XxxUserActions.setSelectedUserId),
      tap(() => {
        void this.router.navigateByUrl('/post')
      })
    ), {dispatch: false}
  );

  showUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxUserActions.showUsers),
      concatLatestFrom(() => this.store.select(XxxUserSelectors.selectIsUsersLoaded)),
      map(([_arg1, arg2]) => arg2),
      filter((isUsersLoaded: boolean) => !isUsersLoaded),
      map(() => XxxUserActions.getUsers())
    ));

  getUsersError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxUserActions.getUsersError),
      tap(() => {
        this.loadingService.loadingOff();
        this.alertService.showError('Error. Unable to get users.');
      }),
    ), {dispatch: false});

  getUsersSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxUserActions.getUsersSuccess),
      tap(() => {
        this.loadingService.loadingOff()
      }),
    ), {dispatch: false});

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxUserActions.getUsers),
      tap(() => {
        this.loadingService.loadingOn()
      }),
      switchMap(() =>
        this.userDataService.getUsers().pipe(
          map((response: XxxUserApiResponse) => XxxUserActions.getUsersSuccess({payload: response})),
          catchError(() => of(XxxUserActions.getUsersError()))
        )
      )
    ));
}
