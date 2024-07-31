import React, { type PropsWithChildren } from 'react'
import { Button as AntdButton, Dropdown, MenuProps } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

interface MenuButtonProps extends React.DOMAttributes<HTMLButtonElement> {
  items: MenuProps['items']
  onEntryClick: MenuProps['onClick']
  container: Element,
}

function MenuButton({ container, items, onEntryClick }: PropsWithChildren<MenuButtonProps>) {
  const menu: MenuProps = {
    items,
    onClick: onEntryClick,
  }

  return (
    <StyleProvider container={container}>
      <Dropdown trigger={['click']} menu={menu} getPopupContainer={(trigger) => trigger}>
        <AntdButton>
          Menu
        </AntdButton>
      </Dropdown>
    </StyleProvider>
  )
}

export type { MenuButtonProps }
export default MenuButton
