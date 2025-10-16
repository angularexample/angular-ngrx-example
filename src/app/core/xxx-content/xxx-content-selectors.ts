import { createFeatureSelector, createSelector } from '@ngrx/store';
import { XxxContentType, xxxContentFeatureName, XxxContentState, XxxContentStatus } from './xxx-content-types';

export const selectContentState = createFeatureSelector<XxxContentState>(xxxContentFeatureName);

export const selectContents = createSelector(
  selectContentState,
  (state: XxxContentState): XxxContentType[] => state.contents
)

export const selectContentByKey = (key: string) => createSelector(
  selectContents,
  (contents: XxxContentType[]): XxxContentType | undefined => contents.find(item => item.key === key)
)

export const selectIsContentLoaded = (key: string) => createSelector(
  selectContentByKey(key),
  (content: XxxContentType | undefined): boolean => content !== undefined && content.status === XxxContentStatus.LOADED
);

export const selectIsContentLoading = (key: string) => createSelector(
  selectContentByKey(key),
  (content: XxxContentType | undefined): boolean => content !== undefined && content.status === XxxContentStatus.LOADING
);

export const selectIsContentEmpty = (key: string) => createSelector(
  selectContentByKey(key),
  (content: XxxContentType | undefined): boolean => content !== undefined && content.status === XxxContentStatus.EMPTY
);

export const selectIsContentError = (key: string) => createSelector(
  selectContentByKey(key),
  (content: XxxContentType | undefined): boolean => content !== undefined && content.status === XxxContentStatus.ERROR
);
