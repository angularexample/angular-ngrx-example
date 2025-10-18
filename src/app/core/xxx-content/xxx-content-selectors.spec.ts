import { mockContentEmpty, mockContentError, mockContentHome, mockContentState } from './xxx-content.mocks';
import * as XxxContentSelectors from './xxx-content-selectors';
import { XxxContentType } from './xxx-content-types';

describe('xxx-content-selectors', () => {

  describe('selectContents', () => {
    it('should return expected contents', () => {
      const expectedResult: XxxContentType[] = mockContentState.contents;
      const result: unknown = XxxContentSelectors.selectContents.projector(mockContentState);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectContentByKey', () => {
    it('should return expected content', () => {
      const expectedResult: XxxContentType = mockContentHome;
      const result: unknown = XxxContentSelectors.selectContentByKey(mockContentHome.key).projector(mockContentState.contents);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectIsContentLoaded', () => {
    it('should return true when loaded', () => {
      const result: unknown = XxxContentSelectors.selectIsContentLoaded(mockContentHome.key).projector(mockContentHome);
      expect(result).toBe(true);
    });

    it('should return false when content not found', () => {
      const result: unknown = XxxContentSelectors.selectIsContentLoaded('none').projector(undefined);
      expect(result).toBe(false);
    });

    it('should return false when content status is not loaded', () => {
      const result: unknown = XxxContentSelectors.selectIsContentLoaded('empty').projector(mockContentEmpty);
      expect(result).toBe(false);
    });
  });

  describe('selectIsContentEmpty', () => {
    it('should return true when status is empty', () => {
      const result: unknown = XxxContentSelectors.selectIsContentEmpty(mockContentHome.key).projector(mockContentEmpty);
      expect(result).toBe(true);
    });

    it('should return false when status is loaded', () => {
      const result: unknown = XxxContentSelectors.selectIsContentEmpty(mockContentHome.key).projector(mockContentHome);
      expect(result).toBe(false);
    });

    it('should return false when content not found', () => {
      const result: unknown = XxxContentSelectors.selectIsContentEmpty('none').projector(undefined);
      expect(result).toBe(false);
    });
  });

  describe('selectIsContentError', () => {
    it('should return true when status is error', () => {
      const result: unknown = XxxContentSelectors.selectIsContentError('error').projector(mockContentError);
      expect(result).toBe(true);
    });

    it('should return false when status is loaded', () => {
      const result: unknown = XxxContentSelectors.selectIsContentError(mockContentHome.key).projector(mockContentHome);
      expect(result).toBe(false);
    });

    it('should return false when content not found', () => {
      const result: unknown = XxxContentSelectors.selectIsContentError('none').projector(undefined);
      expect(result).toBe(false);
    });
  });
});
