import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { mockContentHome } from '../../../core/xxx-content/xxx-content.mocks';
import { mockPost1, mockPost3 } from '../xxx-post.mocks';
import { of } from 'rxjs';
import { XxxContent } from '../../../core/xxx-content/xxx-content';
import { XxxContentFacade } from '../../../core/xxx-content/xxx-content-facade';
import { XxxPostEdit } from './xxx-post-edit';
import { XxxPostFacade } from '../xxx-post-facade';

// Use extended class to test protected method.
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    XxxContent
  ],
  selector: 'extended-xxx-post-edit',
  templateUrl: './xxx-post-edit.html'
})
class ExtendedXxxPostEdit extends XxxPostEdit {
  exposedPostForm: FormGroup = this.postForm;

  override onSubmit() {
    super.onSubmit();
  }
}

describe('XxxPostEdit', () => {
  let component: ExtendedXxxPostEdit;
  let fixture: ComponentFixture<ExtendedXxxPostEdit>;

  const mockXxxContentFacade = {
    contentByKey$: jest.fn().mockReturnValue(of(mockContentHome)),
    isContentEmpty$: jest.fn().mockReturnValue(of(false)),
    isContentError$: jest.fn().mockReturnValue(of(false))
  };

  const mockXxxPostFacade = {
    isNoSelectedPost$: of(false),
    isSaveButtonDisabled$: of(false),
    selectedPost$: of(mockPost1),
    setPostForm: jest.fn(),
    updatePost: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AsyncPipe,
        XxxPostEdit,
        ReactiveFormsModule,
        XxxContent
      ],
      providers: [
        { provide: XxxContentFacade, useValue: mockXxxContentFacade },
        { provide: XxxPostFacade, useValue: mockXxxPostFacade }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ExtendedXxxPostEdit);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('construction', () => {
    it('should create the component', () => {
      expect(component).toBeDefined();
    });
  });

  describe('onSubmit', () => {
    it('should call postFacade.updatePost', () => {
      component.onSubmit();
      expect(mockXxxPostFacade.updatePost).toHaveBeenCalled();
    });
  });

  describe('subscribeToFormChanges', () => {
    it('should call postFacade.setPostForm when a form value changed', () => {
      // In a zoneless app, fakeAsync is not available, use the jest timers instead
      jest.useFakeTimers();
      component.exposedPostForm.setValue(mockPost3);
      // Timer advance time must be equal or greater than debounce time in the valueChanges()
      jest.advanceTimersByTime(300);
      expect(mockXxxPostFacade.setPostForm).toHaveBeenCalledWith(mockPost3);
    });
  });
});
