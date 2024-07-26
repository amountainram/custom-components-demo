import Button, { type ButtonPros } from './Button'
import { customElement, property, query, state } from 'lit/decorators.js'
import { html, unsafeCSS } from 'lit'
import { BkComponent } from '@micro-lc/back-kit-engine/base'
import type { Manifest } from '@micro-lc/compose-toolkit'
import type { PropsWithChildren } from 'react'
import { click } from '../events/click'
import style from './style.css?inline'

@customElement('custom-button')
class _ extends BkComponent<PropsWithChildren<ButtonPros>> {
  static styles = unsafeCSS(style)

  static get __manifest(): Promise<Manifest> {
    return import('./manifest').then(({ default: manifest }) => manifest)
  }

  @property({ type: Boolean, attribute: 'disabled' }) disabled = false

  @state() _counter = 0

  @query('#button-container') container!: HTMLDivElement

  constructor() {
    super(
      Button,
      () => ({ children: ['Increment count'], onClick: () => this.eventBus?.next(click({})) })
    )
  }

  protected render(): unknown {
    return html `<div id='button-container'></div>`
  }
}
