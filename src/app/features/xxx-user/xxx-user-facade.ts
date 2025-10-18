import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { XxxUserActions } from './xxx-user-actions';
import * as XxxUserSelectors from './xxx-user-selectors';
import { XxxUserType } from './xxx-user-types';

@Injectable({
  providedIn: 'root'
})
export class XxxUserFacade {
  private store: Store = inject(Store);
  readonly isUsersEmpty$: Observable<boolean> = this.store.select(XxxUserSelectors.selectIsUsersEmpty);
  readonly isUsersLoaded$: Observable<boolean> = this.store.select(XxxUserSelectors.selectIsUsersLoaded);
  readonly isUsersLoading$: Observable<boolean> = this.store.select(XxxUserSelectors.selectIsUsersLoading);
  readonly selectedUserId$: Observable<number | undefined> = this.store.select(XxxUserSelectors.selectSelectedUserId);
  readonly users$: Observable<XxxUserType[]> = this.store.select(XxxUserSelectors.selectUsers);

  showUsers(): void {
    this.store.dispatch(XxxUserActions.showUsers())
  }

  setSelectedUserId(userId: number): void {
    this.store.dispatch(XxxUserActions.setSelectedUserId({userId}))
  }
}
