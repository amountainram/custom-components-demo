import { factory } from '@micro-lc/back-kit-engine'

interface CustomClickPayload {}

const click = factory<CustomClickPayload>('custom-click')

export type { CustomClickPayload }
export { click }
