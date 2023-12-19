import styles from "./OverlaySpinner.component.module.css"
import { classNames } from "../../../lib/classNames"

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
