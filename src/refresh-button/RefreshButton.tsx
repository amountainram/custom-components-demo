import React, { type PropsWithChildren } from 'react'
import ArrowClockwise from './arrow-clockwise.svg?react'

interface RefreshButtonProps extends React.DOMAttributes<HTMLButtonElement> {}

function Button({ children, ...props }: PropsWithChildren<RefreshButtonProps>) {
  return (
    <button {...props}>
      <ArrowClockwise />
      {children}
    </button>
  )
}

export type { RefreshButtonProps }
export default Button
