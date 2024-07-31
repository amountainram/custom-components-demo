import RefreshButton, { type RefreshButtonProps } from './RefreshButton'
import { customElement, query } from 'lit/decorators.js'
import { html, unsafeCSS } from 'lit'
import type { PropsWithChildren } from 'react'
import type { Manifest } from '@micro-lc/compose-toolkit'
import { changeQuery } from '@micro-lc/back-kit-engine'
import style from './style.css?inline'

import { BkComponent } from '@micro-lc/back-kit-engine/base'

@customElement('refresh-button')
class _ extends BkComponent<PropsWithChildren<RefreshButtonProps>> {
  static get __manifest(): Promise<Manifest> {
    return import('./manifest').then(({ default: manifest }) => manifest)
  }

  static styles = unsafeCSS(style)

  @query('#button-container') container!: HTMLDivElement

  constructor() {
    super(
      RefreshButton,
      () => ({ onClick: () => this.eventBus?.next(changeQuery({})) })
    )
  }

  protected render(): unknown {
    return html `<div id='button-container'></div>`
  }
}
