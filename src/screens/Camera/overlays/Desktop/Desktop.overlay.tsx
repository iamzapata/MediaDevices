import { Button } from "../../../../components/ui/Button"
import { i18N } from "../../../../lib/i18N"
import styles from "./Desktop.overlay.module.css"

interface DesktopLayoutProps {
  children: React.ReactNode
}
export const DesktopOverlay = ({ children }: DesktopLayoutProps) => {
  return (
    <div className={styles.DesktopOverlay}>
      {children}
      <div className={styles.DesktopOverlayContent}>
        <Button className={styles.DesktopOverlayButton}>
          {i18N("TAKE_PHOTO")}
        </Button>
      </div>
    </div>
  )
}
