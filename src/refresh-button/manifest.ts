import type { Manifest } from '@micro-lc/compose-toolkit'

const manifest: Manifest = {
  docLink: '',
  example: JSON.stringify({
    'properties': {
      'content': 'CLICK ME!',
    },
    'tag': 'bk-button',
  }),
  label: 'Button',
  properties: {
    disabled: {
      __mia_configuration: {
        attribute: true,
        description: 'Disables the button',
        label: 'Disabled',
      },
      default: false,
      type: 'boolean',
    },
  },
}

export default manifest
