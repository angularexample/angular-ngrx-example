import {
  mockContentHome,
  mockContentHomeApi,
  mockContentHomeApiEmpty,
  mockContentHomeError,
  mockContentHomeLoading,
  mockContentState,
  mockContentStateHomeEmpty,
  mockContentStateHomeError,
  mockContentStateHomeLoading
} from './xxx-content.mocks';
import { XxxContentActions } from './xxx-content-actions';
import { XxxContentApi, xxxContentInitialState, XxxContentState } from './xxx-content-types';
import { xxxContentReducer } from './xxx-content-reducer';

describe('xxxContentReducer', () => {

  describe('getContent', () => {
    it('should handle case content does not exist', () => {
      const contentKey: string = mockContentHomeLoading.key;
      const startingState: XxxContentState = xxxContentInitialState;
      const expectedState: XxxContentState = {
        ...xxxContentInitialState,
        contents: [mockContentHomeLoading]
      };
      const result: XxxContentState = xxxContentReducer(startingState, XxxContentActions.getContent({ key: contentKey }));
      expect(result).toEqual(expectedState);
    });

    it('should handle case existing content', () => {
      const contentKey: string = mockContentHomeLoading.key;
      const startingState: XxxContentState = mockContentState;
      const expectedState: XxxContentState = mockContentStateHomeLoading;
      const result: XxxContentState = xxxContentReducer(startingState, XxxContentActions.getContent({ key: contentKey }));
      expect(result).toEqual(expectedState);
    });
  });

  describe('getContentError', () => {
    it('should handle case content does not exist', () => {
      const contentKey: string = mockContentHomeError.key;
      const startingState: XxxContentState = xxxContentInitialState;
      const expectedState: XxxContentState = {
        ...xxxContentInitialState,
        contents: [mockContentHomeError]
      };
      const result: XxxContentState = xxxContentReducer(startingState, XxxContentActions.getContentError({ key: contentKey }));
      expect(result).toEqual(expectedState);
    });

    it('should handle case existing content', () => {
      const contentKey: string = mockContentHomeError.key;
      const startingState: XxxContentState = mockContentState;
      const expectedState: XxxContentState = mockContentStateHomeError;
      const result: XxxContentState = xxxContentReducer(startingState, XxxContentActions.getContentError({ key: contentKey }));
      expect(result).toEqual(expectedState);
    });
  });

  describe('getContentSuccess', () => {
    it('should handle case content does not exist', () => {
      const contentApi: XxxContentApi = mockContentHomeApi;
      const startingState: XxxContentState = xxxContentInitialState;
      const expectedState: XxxContentState = {
        ...xxxContentInitialState,
        contents: [mockContentHome]
      };
      const result: XxxContentState = xxxContentReducer(startingState, XxxContentActions.getContentSuccess({ content: contentApi }));
      expect(result).toEqual(expectedState);
    });

    it('should handle case existing content', () => {
      const contentApi: XxxContentApi = mockContentHomeApi;
      const startingState: XxxContentState = mockContentStateHomeLoading;
      const expectedState: XxxContentState = mockContentState;
      const result: XxxContentState = xxxContentReducer(startingState, XxxContentActions.getContentSuccess({ content: contentApi }));
      expect(result).toEqual(expectedState);
    });

    it('should handle case empty content', () => {
      const contentApi: XxxContentApi = mockContentHomeApiEmpty;
      const startingState: XxxContentState = mockContentStateHomeLoading;
      const expectedState: XxxContentState = mockContentStateHomeEmpty;
      const result: XxxContentState = xxxContentReducer(startingState, XxxContentActions.getContentSuccess({ content: contentApi }));
      expect(result).toEqual(expectedState);
    });
  });
});
