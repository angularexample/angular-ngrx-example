export interface XxxContentApi {
  contentModel: XxxContentModel;
  key: string;
}

export const xxxContentFeatureName = 'xxxContent';

export const xxxContentInitialState: XxxContentState = {
  contents: []
};

export interface XxxContentModel {
  bodyText?: string;
  headerTitle?: string;
  pageTitle?: string;
}

export interface XxxContentState {
  contents: XxxContentType[];
}

export enum XxxContentStatus {
  EMPTY = 'EMPTY',
  ERROR = 'ERROR',
  LOADED = 'LOADED',
  LOADING = 'LOADING',
}

export interface XxxContentType {
  contentModel?: XxxContentModel;
  key: string;
  status: XxxContentStatus;
}
