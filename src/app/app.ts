import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { XxxHeader } from './shared/xxx-header/xxx-header';
import { XxxLoading } from './core/xxx-loading/xxx-loading';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    XxxHeader,
    XxxLoading
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
})
export class App {
}
