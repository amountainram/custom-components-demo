import { Manifest } from '@micro-lc/compose-toolkit'

const manifest: Manifest = {
  label: 'Pokemon Api Client',
  properties: {
    baseUrl: {
      default: 'https://pokeapi.co/api/v2',
      description: 'Base URL for fetch API client',
      title: 'Base URL',
      type: 'string',
    },
    startupMillis: {
      default: 1_000,
      title: 'Startup Delay in MS',
      type: 'number',
    },
  },
  type: 'connector',
}

export default manifest
