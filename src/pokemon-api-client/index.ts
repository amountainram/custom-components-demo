// eslint-disable-next-line no-shadow
import { ChangeQueryPayload, Event, EventBus, changeQuery, countData, displayData, loadingData } from '@micro-lc/back-kit-engine'
import { BkHttpBase } from '@micro-lc/back-kit-engine/base'
import { Manifest } from '@micro-lc/compose-toolkit'
import { customElement, property } from 'lit/decorators.js'
import { bufferTime, filter, map } from 'rxjs'

const BASE_URL = 'https://pokeapi.co/api/v2'

const PAGE_SIZE = 25

interface PokemonBasic {
  name: string,
  url?: string
}

interface GetPokemonResult {
  count: number,
  next: string,
  previous?: string | null
  results?: PokemonBasic[]
}

@customElement('pokemon-api-client')
class PokemonApiClient extends BkHttpBase {
  static get __manifest(): Promise<Manifest> {
    return import('./manifest').then(({ default: manifest }) => manifest)
  }

  pageSize = PAGE_SIZE

  @property({ attribute: true, type: String }) baseUrl = BASE_URL

  @property({ attribute: true, type: Number }) startupMillis = 1_000

  constructor() {
    super(changeQueryListener)
  }
}

function changeQueryListener(this: PokemonApiClient, bus: EventBus) {
  return bus.pipe(
    bufferTime(this.startupMillis),
    map((evts) => (evts.length === 0 ? undefined : evts.pop())),
    filter((evt): evt is Event => evt !== undefined),
    filter<Event, Event<ChangeQueryPayload>>(changeQuery.is))
    .subscribe((msg) => {
      const { payload: { pageNumber = 1, pageSize = this.pageSize } } = msg
      this.pageSize = pageSize

      const offset = pageNumber > 0 ? (pageNumber - 1) * pageSize : 0

      const url = new URL(`${this.baseUrl}/pokemon`)
      url.searchParams.set('offset', String(offset))
      url.searchParams.set('limit', String(pageSize))

      this.eventBus?.next(loadingData({ loading: true }))
      this._httpClient.get<GetPokemonResult>(url.href).then(
        ({ data: { count, results = [] } = { count: 0, results: [] } }) => {
          this.eventBus?.next(displayData({ data: results }))
          this.eventBus?.next(countData({
            pageNumber,
            pageSize,
            total: count,
          }))
          this.eventBus?.next(loadingData({ loading: false }))
        })
    })
}
