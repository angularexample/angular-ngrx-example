import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { XxxContentFacade } from './xxx-content-facade';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  selector: 'xxx-content',
  templateUrl: './xxx-content.html',
})
export class XxxContent implements OnInit {
  private contentFacade: XxxContentFacade = inject(XxxContentFacade);
  contentKey:InputSignal<string> = input<string>('');
  protected readonly isContentEmpty$: Observable<boolean> | undefined = this.contentFacade.isContentEmpty$(this.contentKey());
  protected readonly isContentError$: Observable<boolean> | undefined= this.contentFacade.isContentError$(this.contentKey());

  ngOnInit(): void {
    this.contentFacade.showContent(this.contentKey());
  }
}
