import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { XxxContentType } from '../../core/xxx-content/xxx-content-types';
import { XxxContent } from '../../core/xxx-content/xxx-content';
import { XxxContentFacade } from '../../core/xxx-content/xxx-content-facade';
import { XxxPostType } from './xxx-post-types';
import { XxxPostFacade } from './xxx-post-facade';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    XxxContent
  ],
  selector: 'xxx-post',
  templateUrl: './xxx-post.html',
})
export class XxxPost {
  protected readonly contentKey: string = 'post';
  private contentFacade: XxxContentFacade = inject(XxxContentFacade);
  protected readonly content$: Observable<XxxContentType | undefined> = this.contentFacade.contentByKey$(this.contentKey);
  private postFacade: XxxPostFacade = inject(XxxPostFacade);
  protected readonly isNoSelectedUser$: Observable<boolean> = this.postFacade.isNoSelectedUser$;
  protected readonly isPostsEmpty$: Observable<boolean> = this.postFacade.isPostsEmpty$;
  protected readonly isPostsLoaded$: Observable<boolean> = this.postFacade.isPostsLoaded$;
  protected readonly isPostsLoading$: Observable<boolean> = this.postFacade.isPostsLoading$;
  protected readonly posts$: Observable<XxxPostType[]> = this.postFacade.posts$;
  protected readonly selectedPostId$: Observable<number | undefined> = this.postFacade.selectedPostId$;
  protected readonly selectedUserId$: Observable<number | undefined> = this.postFacade.selectedUserId$;

  constructor() {
    this.postFacade.showPosts();
  }

  protected selectPost(post: XxxPostType): void {
    this.postFacade.setSelectedPostId(post.id);
  }
}
