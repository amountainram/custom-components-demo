import MenuButton, { type MenuButtonProps } from './MenuButton'
import { customElement, property, query } from 'lit/decorators.js'
import { html } from 'lit'
import type { PropsWithChildren } from 'react'
import type { Manifest } from '@micro-lc/compose-toolkit'
import { BkComponent } from '@micro-lc/back-kit-engine/base'
import type { MicrolcApi, BaseExtension } from '@micro-lc/orchestrator'

type MlcApi = MicrolcApi<BaseExtension>

@customElement('rounded-menu')
class _ extends BkComponent<PropsWithChildren<MenuButtonProps>> {
  static get __manifest(): Promise<Manifest> {
    return import('./manifest').then(({ default: manifest }) => manifest)
  }

  microlcApi?: Partial<MlcApi>

  @property({ attribute: false }) items: {key: string, label: string}[] = []

  @query('#button-container') container!: HTMLDivElement

  constructor() {
    super(
      MenuButton,
      () => ({
        container: this,
        items: this.items,
        onEntryClick: ({ key }) => this.microlcApi?.router?.goToApplication(key),
      })
    )
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this
  }

  protected render(): unknown {
    return html `
      <div id='button-container'></div>
    `
  }
}
