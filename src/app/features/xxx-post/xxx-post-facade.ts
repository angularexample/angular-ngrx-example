import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { XxxPostActions } from './xxx-post.actions';
import * as XxxPostSelectors from './xxx-post.selectors';
import { XxxPostType } from './xxx-post-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XxxPostFacade {
  private store: Store = inject(Store);
  readonly isNoSelectedPost$: Observable<boolean> = this.store.select(XxxPostSelectors.selectIsNoSelectedPost);
  readonly isNoSelectedUser$: Observable<boolean> = this.store.select(XxxPostSelectors.selectIsNoSelectedUser);
  readonly isPostsEmpty$: Observable<boolean> = this.store.select(XxxPostSelectors.selectIsPostsEmpty);
  readonly isPostsLoaded$: Observable<boolean> = this.store.select(XxxPostSelectors.selectIsPostsLoaded);
  readonly isPostsLoading$: Observable<boolean> = this.store.select(XxxPostSelectors.selectIsPostsLoading);
  readonly isSaveButtonDisabled$: Observable<boolean> = this.store.select(XxxPostSelectors.selectIsSaveButtonDisabled);
  readonly posts$: Observable<XxxPostType[]> = this.store.select(XxxPostSelectors.selectPosts);
  readonly selectedPost$: Observable<XxxPostType | undefined> = this.store.select(XxxPostSelectors.selectSelectedPost);
  readonly selectedPostId$: Observable<number | undefined> = this.store.select(XxxPostSelectors.selectSelectedPostId);
  readonly selectedUserId$: Observable<number | undefined> = this.store.select(XxxPostSelectors.selectSelectedUserId);

  setPostForm(post: XxxPostType): void {
    this.store.dispatch(XxxPostActions.setPostForm({post}))
  }

  setSelectedPostId(postId: number): void {
    this.store.dispatch(XxxPostActions.setSelectedPostId({postId}))
  }

  showPosts(): void {
    this.store.dispatch(XxxPostActions.showPosts())
  }

  updatePost(): void {
    this.store.dispatch(XxxPostActions.updatePost())
  }
}
