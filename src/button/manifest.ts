import type { Manifest } from '@micro-lc/compose-toolkit'

const manifest: Manifest = {
  docLink: '',
  label: 'Button',
  example: JSON.stringify({
    'tag': 'bk-button',
    'properties': {
      'content': 'CLICK ME!',
    },
  }),
  properties: {
    disabled: {
      type: 'boolean',
      default: false,
      __mia_configuration: {
        attribute: true,
        label: 'Disabled',
        description: 'Disables the button',
      },
    },
  },
}

export default manifest
