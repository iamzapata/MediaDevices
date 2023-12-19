import classNames from "classnames"
import { i18N } from "../../../lib/i18N"
import styles from "./ShutterButton.component.module.css"

interface ShutterButtonProps {
  onClick: () => void
  disabled: boolean
  className?: string
}
export const ShutterButton = ({
  onClick,
  disabled,
  className
}: ShutterButtonProps) => {
  return (
    <button
      className={classNames(styles.ShutterButton, className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={i18N("TAKE_PHOTO")}
    />
  )
}
