import { Manifest } from '@micro-lc/compose-toolkit'

const manifest: Manifest = {
  label: 'Rounded Menu',
  properties: {
    items: {
      items: {
        properties: {
          key: { description: 'the unique application id in micro-lc', type: 'string' },
          label: { type: 'string' },
        },
        required: ['items'],
        type: 'object',
      },
      type: 'array',
    },
  },
  type: 'layout',
}

export default manifest
