import { Observable, of } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { SKIP_LOADING, XxxLoadingInterceptor } from './xxx-loading-interceptor';
import { TestBed } from '@angular/core/testing';
import { XxxLoadingService } from './xxx-loading-service';

describe('XxxLoadingInterceptor', () => {
  let service: XxxLoadingInterceptor;
  const url: string = 'https://dummyjson.com/users';
  let req: HttpRequest<unknown>;

  const mockXxxLoadingService = {
    loadingOff: jest.fn(),
    loadingOn: jest.fn(),
  }
  const mockHandler = {
    handle: (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => of(new HttpResponse(req))
  };

  const spyHandler = jest.spyOn(mockHandler, 'handle');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: XxxLoadingInterceptor,
          multi: true
        },
        XxxLoadingInterceptor,
        {provide: XxxLoadingService, useValue: mockXxxLoadingService}
      ],
    });
    service = TestBed.inject(XxxLoadingInterceptor);
    req = new HttpRequest('GET', url);
  })

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  })

  describe('construction', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });
  });

  describe('intercept', () => {
    it('should call XxxLoadingService.loadingOn', () => {
      jest.useFakeTimers();
      service.intercept(req, mockHandler).subscribe();
      // Use runAllTimers to complete the observable subscription
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOn).toHaveBeenCalled();
    });

    it('should call XxxLoadingService.loadingOff when complete', () => {
      jest.useFakeTimers();
      service.intercept(req, mockHandler).subscribe();
      // Use runAllTimers to complete the observable subscription
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });

    it('should call next handler', () => {
      jest.useFakeTimers();
      service.intercept(req, mockHandler).subscribe();
      jest.runAllTimers();
      expect(spyHandler).toHaveBeenCalled();
    });

    it('should skip loading when context SKIP_LOADING is true', () => {
      jest.useFakeTimers();
      req.context.set(SKIP_LOADING, true);
      service.intercept(req, mockHandler).subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOn).not.toHaveBeenCalled();
      expect(mockXxxLoadingService.loadingOff).not.toHaveBeenCalled();
    });
  });
});
