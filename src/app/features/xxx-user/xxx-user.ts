import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { XxxContent } from '../../core/xxx-content/xxx-content';
import { XxxContentFacade } from '../../core/xxx-content/xxx-content-facade';
import { XxxContentType } from '../../core/xxx-content/xxx-content-types';
import { XxxUserFacade } from './xxx-user-facade';
import { XxxUserType } from './xxx-user-types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    XxxContent
  ],
  selector: 'xxx-user',
  templateUrl: './xxx-user.html',
})
export class XxxUser {
  protected readonly contentKey: string = 'user';
  private contentFacade: XxxContentFacade = inject(XxxContentFacade);
  protected readonly content$: Observable<XxxContentType | undefined> = this.contentFacade.contentByKey$(this.contentKey);
  private userFacade: XxxUserFacade = inject(XxxUserFacade);
  protected readonly isUsersEmpty$: Observable<boolean> = this.userFacade.isUsersEmpty$;
  protected readonly isUsersLoaded$: Observable<boolean> = this.userFacade.isUsersLoaded$;
  protected readonly isUsersLoading$: Observable<boolean> = this.userFacade.isUsersLoading$;
  protected readonly selectedUserId$: Observable<number | undefined> = this.userFacade.selectedUserId$;
  protected readonly users$: Observable<XxxUserType[]> = this.userFacade.users$;

  constructor() {
    this.userFacade.showUsers();
  }

  protected rowClick(user: XxxUserType): void {
    this.userFacade.setSelectedUserId(user.id);
  }
}
