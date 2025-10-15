import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { XxxContent } from '../../core/xxx-content/xxx-content';
import { XxxContentType } from '../../core/xxx-content/xxx-content-types';
import { XxxContentFacade } from '../../core/xxx-content/xxx-content-facade';
import { XxxSanitizePipe } from '../../core/xxx-sanitize/xxx-sanitize-pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    XxxContent,
    XxxSanitizePipe
  ],
  selector: 'xxx-home',
  templateUrl: './xxx-home.html',
})
export class XxxHome {
  protected readonly contentKey = 'home';
  private contentFacade: XxxContentFacade = inject(XxxContentFacade);
  protected readonly content$: Observable<XxxContentType | undefined> = this.contentFacade.contentByKey$(this.contentKey);
}
