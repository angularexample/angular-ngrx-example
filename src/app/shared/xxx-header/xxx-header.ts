import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { XxxContent } from '../../core/xxx-content/xxx-content';
import { XxxContentFacade } from '../../core/xxx-content/xxx-content-facade';
import { XxxContentType } from '../../core/xxx-content/xxx-content-types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterLink, XxxContent],
  selector: 'xxx-header',
  styleUrl: './xxx-header.scss',
  templateUrl: './xxx-header.html',
})
export class XxxHeader {
  protected readonly contentKey: string = 'header';
  private contentFacade: XxxContentFacade = inject(XxxContentFacade);
  protected readonly content$: Observable<XxxContentType | undefined> = this.contentFacade.contentByKey$(this.contentKey);
}
