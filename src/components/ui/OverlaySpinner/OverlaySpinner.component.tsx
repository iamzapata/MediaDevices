import { classNames } from "@lib/classNames"
import styles from "./OverlaySpinner.component.module.css"

interface OverlaySpinnerProps {
  children?: React.ReactNode
  isLoading: boolean
}
export const OverlaySpinner = ({
  isLoading,
  children
}: OverlaySpinnerProps) => {
  return (
    <div
      className={classNames(
        styles.OverlaySpinner,
        isLoading && styles.OverlaySpinnerLoading
      )}
    >
      {children}
    </div>
  )
}
