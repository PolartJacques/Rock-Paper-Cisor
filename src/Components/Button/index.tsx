import { FunctionComponent, ReactNode } from "react"
import "./Button.css"

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
}

const Button: FunctionComponent<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}

export default Button