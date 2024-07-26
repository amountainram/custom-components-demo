import { customElement, state } from 'lit/decorators.js'
import { html, unsafeCSS } from 'lit'
import { BkBase } from '@micro-lc/back-kit-engine/base'
import { click } from '../events/click'
import { filter } from 'rxjs'
import style from './style.css?inline'

@customElement('custom-counter')
class _ extends BkBase {
  static styles = unsafeCSS(style)

  @state() _counter = 0

  constructor() {
    super(
      (eventBus) =>
        eventBus.pipe(filter(click.is)).subscribe(() => {
          this._counter += 1
        })
    )
  }

  protected render(): unknown {
    return html `
      <span class="custom-counter">
        Count is: ${this._counter}
      </span>
    `
  }
}
