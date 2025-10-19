import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { XxxAlert } from '../../core/xxx-alert/xxx-alert';
import { XxxLoadingService } from '../../core/xxx-loading/xxx-loading-service';
import { XxxPostActions } from './xxx-post-actions';
import { XxxPostData } from './xxx-post-data';
import * as XxxPostSelectors from './xxx-post-selectors';
import { XxxPostType } from './xxx-post-types';
import * as XxxUserSelectors from '../xxx-user/xxx-user-selectors';

@Injectable()
export class XxxPostEffects {
  private actions$: Actions = inject(Actions);
  private router: Router = inject(Router);
  private store: Store = inject(Store);
  private xxxAlert: XxxAlert = inject(XxxAlert);
  private loadingService: XxxLoadingService = inject(XxxLoadingService);
  private xxxPostData: XxxPostData = inject(XxxPostData);

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxPostActions.getPosts),
      concatLatestFrom(() => this.store.select(XxxPostSelectors.selectSelectedUserId)),
      map(([_arg1, arg2]) => arg2),
      switchMap((userId: number | undefined) => {
        this.loadingService.loadingOn();
        if (userId !== undefined) {
          return this.xxxPostData.getPosts(userId).pipe(
            map((posts: XxxPostType[]) => XxxPostActions.getPostsSuccess({ posts })),
            catchError(() => of(XxxPostActions.getPostsError()))
          );
        } else {
          return of(XxxPostActions.getPostsError());
        }
      })
    ));

  getPostsError$ = createEffect(() => this.actions$.pipe(
      ofType(XxxPostActions.getPostsError),
      tap(() => {
        this.loadingService.loadingOff();
        this.xxxAlert.showError('Error occurred getting posts');
      })
    ), { dispatch: false }
  );

  getPostsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxPostActions.getPostsSuccess),
      tap(() => {
        this.loadingService.loadingOff();
      })
    ), { dispatch: false });

  setSelectedPostId$ = createEffect(() => this.actions$.pipe(
      ofType(XxxPostActions.setSelectedPostId),
      tap(() => {
        void this.router.navigateByUrl('/post/edit');
      })
    ), { dispatch: false }
  );

  setSelectedUserId$ = createEffect(() => this.actions$.pipe(
      ofType(XxxPostActions.setSelectedUserId),
      map(() => XxxPostActions.getPosts())
    )
  );

  // Logic to show user posts
  // 1. If posts are loaded and the user id in the Post state is the same as the user id
  //    in the User state, then do nothing
  // 2. If the user ids in each state are different,
  //    then set the user id in the Post state to the selected user id
  // 3. In any other case, then get the user posts
  showPosts$ = createEffect(() => this.actions$.pipe(
      ofType(XxxPostActions.showPosts),
      concatLatestFrom(() => [
          this.store.select(XxxPostSelectors.selectIsPostsLoaded),
          this.store.select(XxxPostSelectors.selectSelectedUserId),
          this.store.select(XxxUserSelectors.selectSelectedUserId)
        ]
      ),
      map(([_arg1, arg2, arg3, arg4]) => [arg2, arg3, arg4] as [boolean, number | undefined, number | undefined]),
      filter(([isPostsLoaded, postUserId, userUserId]: [boolean, number | undefined, number | undefined]) =>
        (userUserId !== undefined && !(isPostsLoaded && postUserId === userUserId))),
      map(([_isPostsLoaded, postUserId, userUserId]: [boolean, number | undefined, number | undefined]) => {
        if (userUserId !== undefined && userUserId !== postUserId) {
          return XxxPostActions.setSelectedUserId({ userId: userUserId });
        }
        return XxxPostActions.getPosts();
      })
    )
  );

  updatePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(XxxPostActions.updatePost),
      concatLatestFrom(() => this.store.select(XxxPostSelectors.selectPostForm)),
      map(([_arg1, arg2]) => arg2),
      switchMap((post: XxxPostType | undefined) => {
        if (post !== undefined) {
          return this.xxxPostData.updatePost(post).pipe(
            map((postResponse: XxxPostType) => XxxPostActions.updatePostSuccess({ postResponse })),
            catchError(() => of(XxxPostActions.updatePostError()))
          );
        } else {
          return of(XxxPostActions.updatePostError());
        }
      })
    ));

  updatePostError$ = createEffect(() => this.actions$.pipe(
      ofType(XxxPostActions.updatePostError),
      tap(() => {
        this.xxxAlert.showError('Error occurred. Unable to update post');
      })
    ), { dispatch: false }
  );

  updatePostSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(XxxPostActions.updatePostSuccess),
      tap(() => {
        this.xxxAlert.showInfo('Successfully updated post');
        void this.router.navigateByUrl('/post');
      })
    ), { dispatch: false }
  );
}
