import React, { type PropsWithChildren } from 'react'

interface ButtonPros extends React.DOMAttributes<HTMLButtonElement> {}

function Button({ children, ...props }: PropsWithChildren<ButtonPros>) {
  return (
    <button {...props}>
      {children}
    </button>
  )
}

export type { ButtonPros }
export default Button
