import { i18N } from "@lib/i18N"
import classNames from "classnames"
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
    <div className={classNames(styles.ShutterButtonWrapper, className)}>
      <button
        className={styles.ShutterButton}
        onClick={onClick}
        disabled={disabled}
        aria-label={i18N("TAKE_PHOTO")}
      />
    </div>
  )
}
