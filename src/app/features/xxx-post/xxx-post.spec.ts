import { AsyncPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { mockPost1, mockPosts } from './xxx-post.mocks';
import { of } from 'rxjs';
import { XxxContent } from '../../core/xxx-content/xxx-content';
import { XxxContentFacade } from '../../core/xxx-content/xxx-content-facade';
import { XxxPost } from './xxx-post';
import { XxxPostFacade } from './xxx-post-facade';
import { XxxPostType } from './xxx-post-types';

// Use extended class to test protected method.
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    XxxContent
  ],
  selector: 'extended-xxx-post',
  templateUrl: './xxx-post.html'
})
class ExtendedXxxPost extends XxxPost {
  override selectPost(post: XxxPostType) {
    super.selectPost(post);
  }
}

describe('XxxPost', () => {
  let component: ExtendedXxxPost;
  let fixture: ComponentFixture<ExtendedXxxPost>;

  const mockXxxContentFacade = {
    contentByKey$: jest.fn(),
    isContentEmpty$: jest.fn(),
    isContentError$: jest.fn()
  };

  const mockXxxPostFacade = {
    isNoSelectedPost$: of(false),
    isNoSelectedUser$: of(false),
    isPostsEmpty$: of(false),
    isPostsLoaded$: of(false),
    isPostsLoading$: of(false),
    isSaveButtonDisabled$: of(false),
    posts$: of(mockPosts),
    selectedPost$: of(mockPost1),
    selectedPostId$: of(mockPost1.id),
    selectedUserId$: of(mockPost1.userId),
    setPostForm: jest.fn(),
    setSelectedPostId: jest.fn(),
    showPosts: jest.fn(),
    updatePost: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtendedXxxPost],
      providers: [
        { provide: XxxContentFacade, useValue: mockXxxContentFacade },
        { provide: XxxPostFacade, useValue: mockXxxPostFacade }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ExtendedXxxPost);
    component = fixture.componentInstance;
  });

  describe('construction', () => {
    it('should create the component', () => {
      expect(component).toBeDefined();
    });
  });

  describe('selectPost', () => {
    it('should call postFacade.setSelectedPostId', () => {
      component.selectPost(mockPost1);
      expect(mockXxxPostFacade.setSelectedPostId).toHaveBeenCalledWith(mockPost1.id);
    });
  });
});
