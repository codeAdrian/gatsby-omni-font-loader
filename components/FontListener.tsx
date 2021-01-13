import React from "react"
import { hookOptions, useFontListener } from "../hooks"

interface Props {
  options: hookOptions
}

export const FontListener: React.FC<Props> = ({ children, options }) => {
  useFontListener(options)

  return <>{children}</>
}
