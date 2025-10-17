import { XxxContentApi, XxxContentState, XxxContentStatus, XxxContentType } from './xxx-content-types';

export const mockContentEmpty: XxxContentType = {
  contentModel: {},
  key: 'empty',
  status: XxxContentStatus.EMPTY
}

export const mockContentError: XxxContentType = {
  key: 'error',
  status: XxxContentStatus.ERROR
}

export const mockContentHeader: XxxContentType = {
contentModel: {
  headerTitle: `Angular NgRx Example`
  },
  key: 'header',
  status: XxxContentStatus.LOADED
}

export const mockContentHome: XxxContentType = {
  contentModel: {
    bodyText: 'Hello World, this is the body text for home',
    pageTitle: 'Home',
  },
  key: 'home',
  status: XxxContentStatus.LOADED
}

export const mockContentHomeApi: XxxContentApi = {
  contentModel: {
    bodyText: 'Hello World, this is the body text for home',
    pageTitle: 'Home',
  },
  key: 'home'
}

export const mockContentHomeApiEmpty: XxxContentApi = {
  contentModel: {},
  key: 'home'
}

export const mockContentHomeEmpty: XxxContentType = {
  contentModel: {},
  key: 'home',
  status: XxxContentStatus.EMPTY,
}

export const mockContentHomeError: XxxContentType = {
  key: 'home',
  status: XxxContentStatus.ERROR
}

export const mockContentHomeLoading: XxxContentType = {
  key: 'home',
  status: XxxContentStatus.LOADING
}


export const mockContentState: XxxContentState = {
  contents: [
    mockContentEmpty,
    mockContentError,
    mockContentHeader,
    mockContentHome,
  ]
}

export const mockContentStateHomeEmpty: XxxContentState = {
  contents: [
    mockContentEmpty,
    mockContentError,
    mockContentHeader,
    mockContentHomeEmpty,
  ]
}

export const mockContentStateHomeError: XxxContentState = {
  contents: [
    mockContentEmpty,
    mockContentError,
    mockContentHeader,
    mockContentHomeError,
  ]
}

export const mockContentStateHomeLoading: XxxContentState = {
  contents: [
    mockContentEmpty,
    mockContentError,
    mockContentHeader,
    mockContentHomeLoading,
  ]
}
