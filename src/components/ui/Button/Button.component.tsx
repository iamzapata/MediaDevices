import { classNames } from "@lib/classNames"
import styles from "./Button.component.module.css"

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button className={classNames(styles.Button, className)} onClick={onClick}>
      {children}
    </button>
  )
}
