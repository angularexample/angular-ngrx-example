import { XxxContentApi, XxxContentState, XxxContentStatus, XxxContentType } from './xxx-content-types';

export const getContent = (state: XxxContentState, action: { key: string }) => {
  // make a new copy of the contents array
  const contents: XxxContentType[] = <XxxContentType[]>JSON.parse(JSON.stringify(state.contents));
  // look for the content with the given key
  let content: XxxContentType | undefined = contents.find((item: XxxContentType) => item.key === action.key);
  // if not found, add a new content with the given key and status LOADING
  if (content === undefined) {
    content = {
      key: action.key,
      status: XxxContentStatus.LOADING
    };
    contents.push(content);
  } else {
    // if found, remove the model and set the status to LOADING
    content.contentModel = undefined;
    content.status = XxxContentStatus.LOADING;
  }
  return {
    ...state,
    contents
  };
};

export const getContentError = (state: XxxContentState, action: { key: string }) => {
  const contents: XxxContentType[] = <XxxContentType[]>JSON.parse(JSON.stringify(state.contents));
  let content: XxxContentType | undefined = contents.find((item: XxxContentType) => item.key === action.key);
  if (content === undefined) {
    content = {
      key: action.key,
      status: XxxContentStatus.ERROR
    };
    contents.push(content);
  } else {
    content.contentModel = undefined;
    content.status = XxxContentStatus.ERROR;
  }
  return {
    ...state,
    contents
  };
};

export const getContentSuccess = (state: XxxContentState, action: { content: XxxContentApi }) => {
  const contents: XxxContentType[] = <XxxContentType[]>JSON.parse(JSON.stringify(state.contents));
  let content: XxxContentType | undefined = contents.find((item: XxxContentType) => item.key === action.content.key);
  let status: XxxContentStatus = XxxContentStatus.LOADED;
  if (action.content.contentModel === undefined) {
    status = XxxContentStatus.EMPTY;
  }
  if (content === undefined) {
    content = {
      contentModel: action.content.contentModel,
      key: action.content.key,
      status
    };
    contents.push(content);
  } else {
    content.contentModel = action.content.contentModel;
    content.status = status;
  }
  return {
    ...state,
    contents
  };
};
